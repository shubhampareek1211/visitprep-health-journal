// Word version of the 2-page technical paper (no images) — mirrors report.tex
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, LevelFormat,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType
} = require("docx");

const FONT = "Times New Roman";
const BODY = 20;   // 10pt
const TEAL = "0E7466";

const t = (text, o = {}) => new TextRun({ text, font: FONT, size: BODY, ...o });
const p = (runs, o = {}) => new Paragraph({
  spacing: { after: 80, line: 252 },
  alignment: AlignmentType.JUSTIFIED,
  children: Array.isArray(runs) ? runs : [t(runs)],
  ...o
});
const sect = (roman, text) => new Paragraph({
  spacing: { before: 160, after: 70 },
  children: [new TextRun({ text: `${roman}. ${text.toUpperCase()}`, font: FONT, size: 21, bold: true })]
});
const subsect = (letter, text) => new Paragraph({
  spacing: { before: 110, after: 60 },
  children: [new TextRun({ text: `${letter}. ${text}`, font: FONT, size: BODY, bold: true, italics: true })]
});
const ref = (text) => new Paragraph({
  spacing: { after: 60, line: 240 },
  indent: { left: 360, hanging: 360 },
  children: [t(text, { size: 18 })]
});

// results table
const cellB = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const cell = (txt, opts = {}) => new TableCell({
  borders: { top: cellB, bottom: cellB, left: cellB, right: cellB },
  width: { size: opts.w, type: WidthType.DXA },
  shading: opts.head ? { fill: "EEF1F2", type: ShadingType.CLEAR } : undefined,
  margins: { top: 40, bottom: 40, left: 100, right: 100 },
  children: [new Paragraph({
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
    children: [t(txt, { bold: !!opts.head, size: 19 })]
  })]
});
const row = (a, b, head = false) => new TableRow({ children: [cell(a, { w: 2900, head }), cell(b, { w: 1500, head, center: true })] });

const resultsTable = new Table({
  width: { size: 4400, type: WidthType.DXA },
  columnWidths: [2900, 1500],
  alignment: AlignmentType.CENTER,
  rows: [
    row("Metric", "Value", true),
    row("Precision / Recall / F1", "1.00 / 1.00 / 1.00"),
    row("Severity accuracy", "0.94"),
    row("Evidence-span coverage", "1.00"),
    row("Negation false positives", "0"),
    row("Injection-context accuracy", "1.00"),
  ]
});

const children = [
  // ---------- Abstract ----------
  new Paragraph({
    spacing: { before: 60, after: 70 },
    children: [new TextRun({ text: "ABSTRACT", font: FONT, size: 21, bold: true })]
  }),
  p([
    t("Approximately 80% of clinical information exists as unstructured text, and the dominant neural methods for processing it remain difficult to audit in regulated settings. This paper presents "),
    t("VisitPrep", { bold: true }),
    t(", a proof-of-concept web application that demonstrates the full clinical natural language processing (NLP) value chain — free-text patient note → structured symptom signals → trend analytics → clinician-ready summary — using entirely deterministic, on-device processing. Every extracted signal carries an exact evidence span, an assertion status computed by clause-aware negation, a severity estimate, and a confidence score, making the system auditable end to end. On a 150-entry annotated synthetic corpus (156 gold signals), the pipeline achieves precision, recall, and F1 of 1.00, severity accuracy of 0.94, evidence-span coverage of 1.00, and zero negation false positives. These results demonstrate internal correctness of the pipeline rather than real-world generalization; the architecture is explicitly designed so neural components can later be added behind the same typed interfaces without sacrificing the audit trail.")
  ]),

  // ---------- I. Introduction ----------
  sect("I", "Introduction"),
  p("Clinical natural language technology converts unstructured clinical language — physician notes, patient-reported narratives, discharge summaries, scanned documents — into structured, computable data. The field spans five capability layers: core NLP (concepts, assertions, relations); optical character recognition (OCR) for scanned and faxed documents; computer vision over medical images and document layout; large language models (LLMs) that summarize and reason over text; and large multimodal models (LMMs) that reason jointly over text, images, and structured data."),
  p("This work asks a narrow engineering question: how much of the clinical-NLP value chain can be delivered by a fully deterministic, provenance-first system — one in which every output is traceable to the exact source phrase that produced it? The question matters because auditability, not raw accuracy, is frequently the binding constraint in regulated healthcare. The contributions are: (i) a working end-to-end pipeline from free-text patient notes to a clinician-ready summary; (ii) a clause-aware, assertion-ranked extraction method with per-signal evidence spans and confidence scores; and (iii) a deterministic evaluation harness with honest reporting of its limits."),

  // ---------- II. Background and Trends ----------
  sect("II", "Background and Trends"),
  p([t("Past (c. 2000–2015). ", { bold: true }), t("Early clinical NLP relied on dictionary and ontology lookup against the UMLS, exemplified by MetaMap [1] and cTAKES [2], with hand-built rules and negation heuristics; the i2b2/VA shared tasks standardized evaluation of concepts, assertions, and relations [3]. These systems were transparent and cheap but brittle to phrasing.")]),
  p([t("Present (c. 2018–). ", { bold: true }), t("Contextual transformers — BERT [4] and clinical descendants BioBERT [5] and ClinicalBERT [6], trained on corpora such as MIMIC-III [7] — sharply improved accuracy; generative models reached passing-level medical question answering [8], and imaging models matched clinician-level performance on specific tasks [9]. The cost is hallucination, opacity, privacy exposure, and compute.")]),
  p([t("Future. ", { bold: true }), t("The trajectory is multimodal, agentic, and governed: retrieval-grounded pipelines that cite sources, and hybrid systems that wrap neural recall in deterministic guardrails, deployed under de-identification and information-sharing rules [10, 11]. Five trends follow: value shifting from extraction to generation; OCR, vision, and NLP converging into document understanding; provenance becoming a requirement rather than a feature; hybrid architectures prevailing in regulated settings; and privacy-preserving, on-device deployment becoming table stakes. VisitPrep is a deliberate, small-scale instance of this hybrid, governed pattern.")]),

  // ---------- III. System Design ----------
  sect("III", "System Design"),
  subsect("A", "Architecture"),
  p([
    t("VisitPrep is a local Next.js/TypeScript application organized in four layers, with extraction fully separated from presentation. (1) A "),
    t("data layer", { italics: true }),
    t(" defines explicit typed models (JournalEntry, WearableMetrics, ExtractedClinicalSignal) over a synthetic corpus of five patients × 30 days; wearable telemetry is kept separate from journal text and no protected health information is used. (2) An "),
    t("NLP extraction layer", { italics: true }),
    t(" produces structured signals (Sec. III-B). (3) An "),
    t("analytics layer", { italics: true }),
    t(" derives frequencies, severity distributions, and week-one versus week-four wearable trends. (4) A "),
    t("report layer", { italics: true }),
    t(" assembles a clinician-ready summary from computed data only — never from live UI state — so exports are reproducible.")
  ]),
  subsect("B", "Extraction Pipeline"),
  p([
    t("Extraction is deterministic and proceeds in seven steps per note. "),
    t("(1) Sentence spanning", { bold: true }), t(" splits the note into spans that retain absolute character offsets. "),
    t("(2) Dictionary matching", { bold: true }), t(" covers 14 symptoms in 7 categories via weighted aliases with word-boundary, whitespace-tolerant matching. "),
    t("(3) Assertion detection", { bold: true }), t(" classifies each mention as present, absent, uncertain, or resolved using a negation-cue lookback with hedging and resolution cues; the lookback is "),
    t("clause-aware", { italics: true }),
    t(", terminating at boundaries such as “but,” “however,” commas, and semicolons, so “no vomiting since breakfast, but I vomited after lunch” correctly yields a present assertion. "),
    t("(4) Severity detection", { bold: true }), t(" maps phrase evidence to mild/moderate/severe, falling back to nearby context and then to the patient’s daily self-rating. "),
    t("(5) Temporal and injection context", { bold: true }), t(" attaches time-of-day tags and flags symptoms within an approximately 48-hour window of a recorded injection or dose change. "),
    t("(6) Evidence and confidence", { bold: true }), t(": every signal carries its evidence sentence and offsets, matched text, a severity rationale, and a confidence score derived from alias weight and adjusted by assertion, severity, and context (clamped to [0.20, 0.99]). "),
    t("(7) Deduplication and ranking", { bold: true }), t(" selects the best candidate per symptom by assertion status (present > uncertain > resolved > absent), then alias weight, then match length and position, so a genuine present mention is never displaced by an earlier negated one.")
  ]),
  p("Robustness hardening included word-boundary negation (“no” no longer fires inside “normal”), contraction negations (“don’t have,” “isn’t”), clause-aware scope, assertion-aware ranking, and removal of over-broad aliases."),
  subsect("C", "Analytics and Report Generation"),
  p([
    t("The analytics layer computes symptom and category frequencies, an injection-adjacent breakdown, a severity distribution, and per-metric wearable trends (first/last values and week-1 vs. week-4 means). The report layer selects evidence notes by a transparent extractive score, "),
    t("s = 2·n(signals) + 3·n(moderate) + 2·[injection day] + 3·[dose-change day]", { italics: true }),
    t(", greedily admitting notes that introduce a new symptom (capped at five) — a diversity heuristic in the spirit of maximal marginal relevance. Selected notes appear verbatim with the matched phrase highlighted; every report includes a safety disclaimer and uses hedged language (“reported,” “overlapped with,” “may be useful to discuss”).")
  ]),

  // ---------- IV. Evaluation ----------
  sect("IV", "Evaluation"),
  p([
    t("A deterministic harness ("),
    t("npm run nlp:evaluate", { font: "Courier New", size: 18 }),
    t(") scores extraction against annotated synthetic data: 150 entries containing 156 gold symptom signals, plus negated fixtures. Results are shown in Table 1.")
  ]),
  new Paragraph({
    spacing: { before: 60, after: 40 },
    alignment: AlignmentType.CENTER,
    children: [t("Table 1: Extraction results on the annotated synthetic corpus.", { italics: true, size: 18 })]
  }),
  resultsTable,
  p([
    t("Evidence-span coverage of 1.00 means every reported span reproduces the exact source text by character offset — the property that makes the system auditable. "),
    t("Caveat: ", { bold: true }),
    t("the corpus is curated and the rules were tuned against it; these figures establish internal correctness and the integrity of the provenance guarantees, not generalization to real-world clinical text, which would require de-identified data and blind evaluation.")
  ], { spacing: { before: 90, after: 80, line: 252 } }),

  // ---------- V. Safety, Limitations, and Future Work ----------
  sect("V", "Safety, Limitations, and Future Work"),
  p([
    t("The system organizes and summarizes patient-reported data; it does not diagnose, infer causality, recommend treatment, or triage emergencies, and all data is synthetic with no external model or API calls. The principal limitation is coverage: a rule-based dictionary recognizes only the symptoms and phrasings it encodes. Planned work adds local sentence embeddings with clustering and maximal-marginal-relevance selection for semantic evidence, hybrid neural recall behind the same typed interfaces (the "),
    t("extractionMethod", { font: "Courier New", size: 18 }),
    t(" field already anticipates "),
    t("semantic-local", { font: "Courier New", size: 18 }),
    t(" and "),
    t("hybrid", { font: "Courier New", size: 18 }),
    t(" modes), and OCR intake for scanned notes — in each case preserving the invariant that every surfaced result remains traceable to its source.")
  ]),

  // ---------- VI. Conclusion ----------
  sect("VI", "Conclusion"),
  p("VisitPrep demonstrates that a deterministic, provenance-first design can deliver the complete clinical-NLP value chain — capture, extraction, analytics, and a clinician-ready summary — in a form that is auditable end to end. As the field moves toward multimodal and generative methods, this audit trail is precisely the property production clinical systems will be required to keep."),

  // ---------- References ----------
  sect("", "References").children ? sect("", "References") : null,
].filter(Boolean);

// fix references header (no roman numeral)
children[children.length - 1] = new Paragraph({
  spacing: { before: 160, after: 70 },
  children: [new TextRun({ text: "REFERENCES", font: FONT, size: 21, bold: true })]
});

const refs = [
  "[1] A. R. Aronson and F. M. Lang, “An overview of MetaMap: historical perspective and recent advances,” JAMIA, 17(3):229–236, 2010.",
  "[2] G. K. Savova et al., “Mayo clinical Text Analysis and Knowledge Extraction System (cTAKES),” JAMIA, 17(5):507–513, 2010.",
  "[3] Ö. Uzuner, B. R. South, S. Shen, and S. L. DuVall, “2010 i2b2/VA challenge on concepts, assertions, and relations in clinical text,” JAMIA, 18(5):552–556, 2011.",
  "[4] J. Devlin, M.-W. Chang, K. Lee, and K. Toutanova, “BERT: pre-training of deep bidirectional transformers for language understanding,” in Proc. NAACL-HLT, 2019, pp. 4171–4186.",
  "[5] J. Lee et al., “BioBERT: a pre-trained biomedical language representation model for biomedical text mining,” Bioinformatics, 36(4):1234–1240, 2020.",
  "[6] E. Alsentzer et al., “Publicly available clinical BERT embeddings,” in Proc. 2nd Clinical NLP Workshop, 2019, pp. 72–78.",
  "[7] A. E. W. Johnson et al., “MIMIC-III, a freely accessible critical care database,” Scientific Data, 3:160035, 2016.",
  "[8] K. Singhal et al., “Large language models encode clinical knowledge,” Nature, 620:172–180, 2023.",
  "[9] P. Rajpurkar et al., “CheXNet: radiologist-level pneumonia detection on chest X-rays with deep learning,” arXiv:1711.05225, 2017.",
  "[10] Office of the National Coordinator for Health IT, 21st Century Cures Act: Interoperability, Information Blocking, and the ONC Health IT Certification Program (Final Rule), U.S. HHS, 2020.",
  "[11] U.S. Department of Health and Human Services, Guidance Regarding Methods for De-identification of Protected Health Information in Accordance with the HIPAA Privacy Rule, 2012.",
];
refs.forEach((r) => children.push(ref(r)));

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: BODY } } } },
  sections: [
    {
      // Title block: single column
      properties: {
        page: { size: { width: 12240, height: 15840 }, margin: { top: 1040, right: 1040, bottom: 1040, left: 1040 } },
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
          children: [new TextRun({ text: "VisitPrep: A Deterministic, Provenance-First Clinical Natural Language Processing Pipeline for Patient-Reported Notes", font: FONT, size: 30, bold: true })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 20 },
          children: [new TextRun({ text: "Shubham Pareek", font: FONT, size: 22 })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 140 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: TEAL, space: 8 } },
          children: [new TextRun({ text: "Columbia University   |   Intern Assessment — Topic 1: Clinical Natural Language Technology", font: FONT, size: 19, color: "444444" })]
        }),
      ]
    },
    {
      // Body: two columns, continuous
      properties: {
        type: "continuous",
        page: { size: { width: 12240, height: 15840 }, margin: { top: 1040, right: 1040, bottom: 1040, left: 1040 } },
        column: { count: 2, space: 340, equalWidth: true },
      },
      children
    }
  ]
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("deliverables/VisitPrep_Clinical_NLP_Report.docx", buf);
  console.log("wrote deliverables/VisitPrep_Clinical_NLP_Report.docx", buf.length, "bytes");
});
