import type {
  ClinicalAssertionStatus,
  ExtractedClinicalSignal,
  JournalEntry,
  SymptomSeverity
} from "@/types/health";
import { symptomDictionary, type SymptomDefinition } from "./symptomDictionary";

type AliasDefinition = {
  term: string;
  weight: number;
};

type SentenceSpan = {
  text: string;
  normalizedText: string;
  start: number;
  end: number;
};

type CandidateMatch = {
  symptom: SymptomDefinition;
  alias: AliasDefinition;
  matchedText: string;
  matchStart: number;
  matchEnd: number;
  sentence: SentenceSpan;
  noteText: string;
};

type ExtractionOptions = {
  includeInactive?: boolean;
  includeAbsent?: boolean;
};

type SeverityResult = {
  severity: SymptomSeverity;
  reason: string;
};

type InjectionContextResult = {
  related: boolean;
  reason: string;
};

const severityPhrases: Array<{
  severity: Exclude<SymptomSeverity, "none" | "unknown">;
  phrases: string[];
  reason: string;
}> = [
  {
    severity: "moderate",
    phrases: ["not awful but enough", "vomited", "vomiting", "threw up", "wiped out"],
    reason: "moderate phrase in evidence sentence"
  },
  {
    severity: "severe",
    phrases: ["severe", "awful", "couldn't keep", "could not keep", "worst", "intense"],
    reason: "severe phrase in evidence sentence"
  },
  {
    severity: "mild",
    phrases: ["mild", "manageable", "tracking it", "kind of waves", "slight", "a little"],
    reason: "mild phrase in evidence sentence"
  }
];

const absentPatterns = [
  "no",
  "not",
  "denies",
  "denied",
  "without",
  "none",
  "never",
  "didn't have",
  "did not have",
  "don't have",
  "do not have",
  "doesn't have",
  "does not have",
  "don't",
  "doesn't",
  "haven't",
  "hasn't",
  "isn't",
  "wasn't",
  "aren't"
];

const resolvedPatterns = [
  "resolved",
  "went away",
  "gone now",
  "cleared",
  "better now",
  "no longer"
];

const uncertainPatterns = [
  "maybe",
  "might be",
  "could be",
  "felt like",
  "sort of",
  "not sure",
  "possible"
];

const injectionContextPhrases = [
  "shot day",
  "day after/near shot",
  "day after shot",
  "after injection",
  "near shot",
  "injection day",
  "higher dose",
  "dose this week",
  "dose increase"
];

const temporalPatterns: Array<{ label: string; phrases: string[] }> = [
  { label: "today", phrases: ["today"] },
  { label: "yesterday", phrases: ["yesterday"] },
  { label: "morning", phrases: ["morning"] },
  { label: "afternoon", phrases: ["afternoon"] },
  { label: "evening", phrases: ["evening"] },
  { label: "overnight", phrases: ["overnight", "last night"] },
  { label: "post-injection", phrases: ["after injection", "day after shot", "near shot"] }
];

export function extractClinicalSignals(
  entry: JournalEntry,
  options: ExtractionOptions = {}
): ExtractedClinicalSignal[] {
  const note = entry.rawJournalNote;
  const sentenceSpans = splitIntoSentenceSpans(note);
  const matches = findSymptomMatches(sentenceSpans);

  return matches
    .map((match) => buildSignal(entry, match))
    .filter(
      (signal) =>
        options.includeInactive ||
        options.includeAbsent ||
        signal.assertionStatus === "present" ||
        signal.assertionStatus === "uncertain"
    );
}

export function extractClinicalSignalsForEntries(
  entries: JournalEntry[],
  options: ExtractionOptions = {}
): ExtractedClinicalSignal[] {
  return entries.flatMap((entry) => extractClinicalSignals(entry, options));
}

export function isActionableClinicalSignal(signal: ExtractedClinicalSignal) {
  return signal.assertionStatus !== "absent";
}

function buildSignal(
  entry: JournalEntry,
  match: CandidateMatch
): ExtractedClinicalSignal {
  const assertionStatus = detectAssertionStatus(match);
  const severity = detectSeverity(match, assertionStatus, entry.selfRatedSeverity);
  const injection = detectInjectionContext(entry, match);
  const temporalContext = detectTemporalContext(match);
  const confidence = scoreConfidence(match, assertionStatus, severity.severity, injection.related);

  return {
    entryId: `${entry.date}-day-${entry.day}`,
    date: entry.date,
    symptom: match.symptom.name,
    normalizedSymptom: match.symptom.name,
    category: match.symptom.category,
    severity: severity.severity,
    evidenceText: match.sentence.text,
    matchedText: match.matchedText,
    evidenceStart: match.sentence.start,
    evidenceEnd: match.sentence.end,
    assertionStatus,
    temporalContext,
    severityReason: severity.reason,
    confidence,
    relatedToInjection: injection.related,
    relatedToInjectionReason: injection.reason,
    extractionMethod: "rule-based"
  };
}

function findSymptomMatches(sentenceSpans: SentenceSpan[]): CandidateMatch[] {
  const bestBySymptom = new Map<string, CandidateMatch>();

  for (const sentence of sentenceSpans) {
    for (const symptom of symptomDictionary) {
      for (const alias of normalizeAliases(symptom)) {
        const match = findAliasInSentence(sentence, alias);
        if (!match) {
          continue;
        }

        const candidate: CandidateMatch = {
          symptom,
          alias,
          matchedText: match.text,
          matchStart: match.start,
          matchEnd: match.end,
          sentence,
          noteText: sentenceSpans.map((span) => span.text).join(" ")
        };

        const current = bestBySymptom.get(symptom.name);
        if (!current || rankCandidate(candidate) > rankCandidate(current)) {
          bestBySymptom.set(symptom.name, candidate);
        }
      }
    }
  }

  return [...bestBySymptom.values()].sort(
    (left, right) => left.matchStart - right.matchStart
  );
}

function normalizeAliases(symptom: SymptomDefinition): AliasDefinition[] {
  return symptom.aliases.map((alias) =>
    typeof alias === "string" ? { term: alias, weight: 0.86 } : alias
  );
}

function findAliasInSentence(sentence: SentenceSpan, alias: AliasDefinition) {
  const pattern = phraseBoundaryRegex(alias.term);
  const match = pattern.exec(sentence.text);
  if (!match) {
    return null;
  }

  const prefix = match[1] ?? "";
  const text = match[2] ?? match[0];
  const start = sentence.start + match.index + prefix.length;
  const end = start + text.length;

  return { start, end, text };
}

function rankCandidate(candidate: CandidateMatch) {
  return (
    assertionStatusRank(detectAssertionStatus(candidate)) * 1000 +
    candidate.alias.weight * 100 +
    candidate.matchedText.length / 100 -
    candidate.matchStart / 100000
  );
}

function assertionStatusRank(status: ClinicalAssertionStatus) {
  switch (status) {
    case "present":
      return 3;
    case "uncertain":
      return 2;
    case "resolved":
      return 1;
    case "absent":
    default:
      return 0;
  }
}

function detectAssertionStatus(match: CandidateMatch): ClinicalAssertionStatus {
  const before = localWindowBefore(match.sentence.text, match.matchStart - match.sentence.start);
  const sentence = normalize(match.sentence.text);

  if (hasPhrase(sentence, resolvedPatterns)) {
    return "resolved";
  }

  if (hasPhrase(normalize(before), absentPatterns)) {
    return "absent";
  }

  if (hasPhrase(sentence, uncertainPatterns)) {
    return "uncertain";
  }

  return "present";
}

function detectSeverity(
  match: CandidateMatch,
  assertionStatus: ClinicalAssertionStatus,
  selfRatedSeverity: number
): SeverityResult {
  if (assertionStatus === "absent") {
    return { severity: "none", reason: "negated symptom mention" };
  }

  const normalizedSentence = normalize(match.sentence.text);
  const normalizedNote = normalize(match.noteText);

  for (const group of severityPhrases) {
    if (hasPhrase(normalizedSentence, group.phrases)) {
      return { severity: group.severity, reason: group.reason };
    }
  }

  for (const group of severityPhrases.filter((group) => group.severity !== "mild")) {
    if (hasPhrase(normalizedNote, group.phrases)) {
      return {
        severity: group.severity,
        reason: `${group.reason}; applied from nearby journal context`
      };
    }
  }

  const selfRatedSeverityResult = severityFromSelfRating(selfRatedSeverity);
  if (selfRatedSeverityResult) {
    return selfRatedSeverityResult;
  }

  if (match.symptom.name === "vomiting") {
    return {
      severity: "moderate",
      reason: "vomiting is treated as moderate unless severe wording is present"
    };
  }

  if (assertionStatus === "resolved") {
    return { severity: "mild", reason: "resolved symptom mention" };
  }

  if (assertionStatus === "uncertain") {
    return { severity: "unknown", reason: "uncertain symptom mention" };
  }

  return { severity: "unknown", reason: "no local severity phrase found" };
}

function severityFromSelfRating(selfRatedSeverity: number): SeverityResult | null {
  if (selfRatedSeverity >= 4) {
    return {
      severity: "severe",
      reason: "fallback from daily self-rated severity"
    };
  }
  if (selfRatedSeverity === 3) {
    return {
      severity: "moderate",
      reason: "fallback from daily self-rated severity"
    };
  }
  if (selfRatedSeverity > 0) {
    return {
      severity: "mild",
      reason: "fallback from daily self-rated severity"
    };
  }
  return null;
}

function detectInjectionContext(
  entry: JournalEntry,
  match: CandidateMatch
): InjectionContextResult {
  const normalizedSentence = normalize(match.sentence.text);

  if (entry.doseChangeDay) {
    return { related: true, reason: "journal entry is marked as a dose-change day" };
  }

  if (entry.injectionDay) {
    return { related: true, reason: "journal entry is marked as an injection day" };
  }

  const phrase = injectionContextPhrases.find((candidate) =>
    normalizedSentence.includes(normalize(candidate))
  );

  if (phrase) {
    return { related: true, reason: `matched injection context phrase "${phrase}"` };
  }

  return { related: false, reason: "no injection context detected" };
}

function detectTemporalContext(match: CandidateMatch) {
  const normalizedSentence = normalize(match.sentence.text);
  const contexts = temporalPatterns
    .filter((pattern) => hasPhrase(normalizedSentence, pattern.phrases))
    .map((pattern) => pattern.label);

  return contexts.length > 0 ? contexts : ["unspecified"];
}

function scoreConfidence(
  match: CandidateMatch,
  assertionStatus: ClinicalAssertionStatus,
  severity: SymptomSeverity,
  relatedToInjection: boolean
) {
  let confidence = match.alias.weight;

  if (assertionStatus === "present") {
    confidence += 0.06;
  }
  if (assertionStatus === "uncertain") {
    confidence -= 0.18;
  }
  if (assertionStatus === "absent") {
    confidence -= 0.08;
  }
  if (severity !== "unknown" && severity !== "none") {
    confidence += 0.04;
  }
  if (relatedToInjection) {
    confidence += 0.02;
  }

  return Math.max(0.2, Math.min(0.99, roundToTwo(confidence)));
}

function splitIntoSentenceSpans(note: string): SentenceSpan[] {
  const spans: SentenceSpan[] = [];
  const regex = /[^.!?\n]+[.!?]?/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(note)) !== null) {
    const raw = match[0];
    const leadingWhitespace = raw.search(/\S/);
    if (leadingWhitespace < 0) {
      continue;
    }

    const trimmed = raw.trim();
    const start = match.index + leadingWhitespace;
    const end = start + trimmed.length;

    spans.push({
      text: trimmed,
      normalizedText: normalize(trimmed),
      start,
      end
    });
  }

  return spans.length > 0
    ? spans
    : [{ text: note, normalizedText: normalize(note), start: 0, end: note.length }];
}

const clauseBoundaryRegex = /[,;]|\b(?:but|however|although|though|yet)\b/gi;

function localWindowBefore(sentence: string, matchOffsetInSentence: number) {
  const cappedStart = Math.max(0, matchOffsetInSentence - 36);
  const clauseStart = lastClauseBoundaryEnd(sentence, matchOffsetInSentence);
  const start = Math.max(cappedStart, clauseStart);
  return sentence.slice(start, matchOffsetInSentence);
}

function lastClauseBoundaryEnd(sentence: string, beforeIndex: number) {
  const scoped = sentence.slice(0, beforeIndex);
  clauseBoundaryRegex.lastIndex = 0;
  let lastEnd = 0;
  let match: RegExpExecArray | null;
  while ((match = clauseBoundaryRegex.exec(scoped)) !== null) {
    lastEnd = match.index + match[0].length;
  }
  return lastEnd;
}

function phraseBoundaryRegex(phrase: string) {
  const escaped = escapeRegExp(phrase.trim()).replace(/ /g, "\\s+");
  return new RegExp(`(^|[^a-zA-Z0-9])(${escaped})(?=$|[^a-zA-Z0-9])`, "i");
}

function hasPhrase(normalizedText: string, phrases: string[]) {
  return phrases.some((phrase) => phraseBoundaryRegex(normalize(phrase)).test(normalizedText));
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function roundToTwo(value: number) {
  return Math.round(value * 100) / 100;
}
