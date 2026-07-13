const pptxgen = require("pptxgenjs");

// ---------- VisitPrep design tokens ----------
const C = {
  teal:      "0e7466",
  teal500:   "128a78",
  tealDeep:  "0a4942",
  teal50:    "e9f6f3",
  textStrong:"151a1d",
  body:      "353d42",
  muted:     "6a757c",
  border:    "dce1e3",
  surface:   "ffffff",
  canvas:    "f5f7f7",
  sunken:    "eef1f2",
  amber:     "a2670a",
  amberTint: "fdf4e4",
  red:       "ad2c20",
  redTint:   "fbece9",
  dvSlate:   "5a7480",
};
const FONT = "Public Sans";
const SHOT = "/Users/shubhampareek/Documents/Cotivit/docs/screenshots";

const pres = new pptxgen();
pres.defineLayout({ name: "W", width: 13.333, height: 7.5 });
pres.layout = "W";
pres.author = "Shubham Pareek";
pres.title = "VisitPrep — A Clinical Natural Language Technology Proof of Concept";

const W = 13.333, H = 7.5;
const MX = 0.7;
const shadow = () => ({ type: "outer", color: "9aa5aa", blur: 7, offset: 3, angle: 90, opacity: 0.18 });

function base(slide) { slide.background = { color: C.surface }; }
function eyebrow(slide, text, x = MX, y = 0.5) {
  slide.addText(text.toUpperCase(), { x, y, w: 11, h: 0.3, margin: 0, fontFace: FONT, fontSize: 11, bold: true, color: C.teal, charSpacing: 2, align: "left", valign: "middle" });
}
function title(slide, text, x = MX, y = 0.82, w = 12, size = 29) {
  slide.addText(text, { x, y, w, h: 0.8, margin: 0, fontFace: FONT, fontSize: size, bold: true, color: C.textStrong, align: "left", valign: "top" });
}
function divider(slide, y = 1.68, x = MX, w = W - 2 * MX) {
  slide.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color: C.border, width: 1 } });
}
function footer(slide, n) {
  slide.addText("VisitPrep · A clinical NLP proof of concept", { x: MX, y: H - 0.42, w: 8, h: 0.3, margin: 0, fontFace: FONT, fontSize: 8.5, color: C.muted, align: "left", valign: "middle" });
  slide.addText(String(n), { x: W - 1.2, y: H - 0.42, w: 0.5, h: 0.3, margin: 0, fontFace: FONT, fontSize: 8.5, color: C.muted, align: "right", valign: "middle" });
}
function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: opts.fill || C.surface }, line: { color: opts.line || C.border, width: 1 }, shadow: opts.shadow ? shadow() : undefined });
}
// framed screenshot (image + thin border frame)
function shot(slide, file, x, y, w) {
  const h = w / 1.6;
  slide.addImage({ path: `${SHOT}/${file}`, x, y, w, h });
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { type: "none" }, line: { color: C.border, width: 1 }, shadow: shadow() });
  return h;
}
const bullets = (arr, size = 12) => arr.map((t) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, breakLine: true, color: C.body, fontFace: FONT, fontSize: size, paraSpaceAfter: 7, lineSpacingMultiple: 1.08 } }));

let SN = 0;

// =====================================================================
// 1 — TITLE
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++;
  s.background = { color: C.tealDeep };
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX, y: 1.55, w: 0.62, h: 0.62, rectRadius: 0.1, fill: { color: C.teal500 }, line: { type: "none" } });
  s.addText("VP", { x: MX, y: 1.55, w: 0.62, h: 0.62, margin: 0, fontFace: FONT, fontSize: 20, bold: true, color: "ffffff", align: "center", valign: "middle" });
  s.addText("CLINICAL NATURAL LANGUAGE TECHNOLOGY", { x: 1.45, y: 1.62, w: 10, h: 0.4, margin: 0, fontFace: FONT, fontSize: 12.5, bold: true, color: C.teal50, charSpacing: 3, valign: "middle" });
  s.addText([
    { text: "VisitPrep", options: { color: "ffffff", bold: true } },
    { text: "  —  A Clinical Natural Language Technology Proof of Concept", options: { color: "d7ece8" } },
  ], { x: MX, y: 2.35, w: 12.1, h: 1.6, margin: 0, fontFace: FONT, fontSize: 38, bold: true, align: "left", valign: "top", lineSpacingMultiple: 1.03 });
  s.addText("Past, Present & Future  ·  NLP · OCR · Computer Vision · LLM · LMM", { x: MX, y: 4.15, w: 12, h: 0.5, margin: 0, fontFace: FONT, fontSize: 17, color: C.teal50, align: "left", valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: MX, y: 4.95, w: 5.2, h: 0, line: { color: C.teal500, width: 1.5 } });
  s.addText([
    { text: "Shubham Pareek", options: { bold: true, color: "ffffff" } },
    { text: "  —  Columbia University", options: { color: "cfe4e0" } },
  ], { x: MX, y: 5.25, w: 12, h: 0.45, margin: 0, fontFace: FONT, fontSize: 16, align: "left", valign: "middle" });
  s.addText("Intern Assessment  ·  Topic 1", { x: MX, y: 5.72, w: 12, h: 0.4, margin: 0, fontFace: FONT, fontSize: 13.5, color: "b9d6d1", align: "left", valign: "middle" });
  s.addText("A local, source-grounded, provenance-first application  ·  deterministic on-device processing  ·  synthetic data only", { x: MX, y: 6.8, w: 12, h: 0.3, margin: 0, fontFace: FONT, fontSize: 10.5, italic: true, color: "9ec4bd", align: "left", valign: "middle" });
  s.addNotes("Introduce myself and the project. This is my individual proof of concept, VisitPrep, built for Topic 1 on clinical natural language technology. It runs entirely locally with deterministic, source-grounded processing.");
})();

// =====================================================================
// 2 — WHAT CLINICAL NLP IS (five layers + 80%)
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "What clinical NLP is");
  title(s, "Five capability layers, turning text into computable data");
  divider(s); footer(s, SN);
  s.addText([
    { text: "~80% ", options: { bold: true, color: C.teal, fontSize: 15 } },
    { text: "of clinical data is unstructured text — notes, patient narratives, discharge summaries, scanned documents. Clinical NLP makes it computable.", options: { color: C.body, fontSize: 13 } },
  ], { x: MX, y: 1.82, w: W - 2 * MX, h: 0.4, margin: 0, fontFace: FONT, valign: "middle" });

  const layers = [
    ["NLP", "Parse free text into concepts, assertions (present / absent / uncertain) and relations. The foundation."],
    ["OCR", "Convert scanned faxes, PDFs and handwritten or printed documents into machine-readable text."],
    ["Computer Vision", "Extract signal from medical images and document layout — tables, fields, stamps, signatures."],
    ["LLM", "Transformer models (BERT → GPT-4 class) that summarize and reason with less task engineering."],
    ["LMM", "Large multimodal models reasoning jointly over text + images + structured data — the frontier."],
  ];
  const n = layers.length, gap = 0.22, totalW = W - 2 * MX;
  const cw = (totalW - gap * (n - 1)) / n;
  const y = 2.5, ch = 3.75;
  layers.forEach(([h, b], i) => {
    const x = MX + i * (cw + gap);
    card(s, x, y, cw, ch, { shadow: true });
    s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: y + 0.3, w: 0.5, h: 0.5, fill: { color: C.teal }, line: { type: "none" } });
    s.addText(String(i + 1), { x: x + 0.25, y: y + 0.3, w: 0.5, h: 0.5, margin: 0, fontFace: FONT, fontSize: 16, bold: true, color: "ffffff", align: "center", valign: "middle" });
    s.addText(h, { x: x + 0.2, y: y + 0.95, w: cw - 0.4, h: 0.9, margin: 0, fontFace: FONT, fontSize: h.length > 5 ? 15 : 20, bold: true, color: C.teal, valign: "top", lineSpacingMultiple: 1.0 });
    s.addText(b, { x: x + 0.2, y: y + 1.75, w: cw - 0.4, h: 1.9, margin: 0, fontFace: FONT, fontSize: 11.5, color: C.body, valign: "top", lineSpacingMultiple: 1.12 });
  });
  s.addText("VisitPrep operates in the NLP layer, with typed interfaces designed so the others can be layered in.", { x: MX, y: 6.5, w: totalW, h: 0.45, margin: 0, fontFace: FONT, fontSize: 12.5, italic: true, color: C.tealDeep, align: "center", valign: "middle" });
  s.addNotes("Clinical NLP spans five layers: NLP, OCR, computer vision, large language models, and large multimodal models. My project works in the first layer but is built so the others can be added.");
})();

// =====================================================================
// 3 — PAST -> PRESENT -> FUTURE
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "The arc");
  title(s, "Past → Present → Future");
  divider(s); footer(s, SN);
  const cols = [
    { tag: "PAST · ~2000–2015", head: "Rule-based & statistical",
      pts: ["UMLS dictionary / ontology lookup — MetaMap, cTAKES", "Hand-built rules, regex, negation (NegEx), assertions", "Shared tasks: i2b2 / n2c2 challenges"],
      note: "Transparent, auditable, cheap — but brittle to phrasing.", fill: C.sunken, tagColor: C.muted },
    { tag: "PRESENT · ~2018–now", head: "Transformer era",
      pts: ["BERT → BioBERT, ClinicalBERT (on MIMIC-III)", "Generative LLMs; Med-PaLM passes medical QA", "Vision: CheXNet; document AI fuses OCR + layout"],
      note: "State-of-the-art — but hallucination, opacity, PHI risk.", fill: C.teal50, tagColor: C.teal },
    { tag: "FUTURE", head: "Multimodal, agentic, governed",
      pts: ["LMMs over notes + images + labs", "Retrieval-grounded / agentic pipelines that cite spans", "Hybrid deterministic + neural, governance-first"],
      note: "Neural recall with deterministic guardrails — the pattern this project follows.", fill: C.surface, tagColor: C.teal500 },
  ];
  const n = cols.length, gap = 0.35, totalW = W - 2 * MX;
  const cw = (totalW - gap * (n - 1)) / n;
  const y = 2.2, ch = 4.35;
  cols.forEach((c, i) => {
    const x = MX + i * (cw + gap);
    card(s, x, y, cw, ch, { fill: c.fill, shadow: true });
    s.addText(c.tag, { x: x + 0.28, y: y + 0.28, w: cw - 0.56, h: 0.35, margin: 0, fontFace: FONT, fontSize: 11, bold: true, color: c.tagColor, charSpacing: 1, valign: "middle" });
    s.addText(c.head, { x: x + 0.28, y: y + 0.68, w: cw - 0.56, h: 0.7, margin: 0, fontFace: FONT, fontSize: 18, bold: true, color: C.textStrong, valign: "top", lineSpacingMultiple: 1.0 });
    s.addText(bullets(c.pts, 12.5), { x: x + 0.28, y: y + 1.55, w: cw - 0.5, h: 2.0, margin: 0, valign: "top" });
    s.addText(c.note, { x: x + 0.28, y: y + ch - 0.9, w: cw - 0.56, h: 0.75, margin: 0, fontFace: FONT, fontSize: 11.5, italic: true, color: C.body, valign: "top", lineSpacingMultiple: 1.1 });
  });
  [0, 1].forEach((i) => {
    const ax = MX + (i + 1) * cw + i * gap + 0.02;
    s.addText("→", { x: ax, y: y + ch / 2 - 0.3, w: gap - 0.04, h: 0.6, margin: 0, fontFace: FONT, fontSize: 22, bold: true, color: C.teal, align: "center", valign: "middle" });
  });
  s.addNotes("The field moved from transparent but brittle rule-based systems, to accurate but opaque transformer models, toward a governed, hybrid future. VisitPrep is a small instance of that hybrid, provenance-first pattern.");
})();

// =====================================================================
// 4 — TRENDS
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "Trends");
  title(s, "Where clinical NLP is heading");
  divider(s); footer(s, SN);
  const trends = [
    ["From extraction to generation", "Value shifts from tagging concepts to summarizing and drafting — ambient scribes and narratives."],
    ["Multimodal + document AI converge", "OCR + CV + NLP merge into one document-understanding stack for the fax / PDF reality of healthcare."],
    ["Grounding & provenance are required", "Clinicians and auditors demand source-linked evidence; ungrounded generation is a liability."],
    ["Hybrid architectures win in regulated settings", "Deterministic guardrails wrap neural models to keep outputs auditable and safe."],
    ["Privacy-preserving / on-device deployment", "De-identification and local models become table stakes wherever PHI is involved."],
  ];
  const colW = 5.85, gapX = 0.35, rowH = 1.28, gapY = 0.18, startX = MX, startY = 2.15;
  trends.forEach(([h, b], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = startX + col * (colW + gapX);
    const y = startY + row * (rowH + gapY);
    card(s, x, y, colW, rowH, { shadow: true });
    s.addShape(pres.shapes.OVAL, { x: x + 0.22, y: y + 0.24, w: 0.62, h: 0.62, fill: { color: C.teal50 }, line: { color: C.teal, width: 1 } });
    s.addText(String(i + 1), { x: x + 0.22, y: y + 0.24, w: 0.62, h: 0.62, margin: 0, fontFace: FONT, fontSize: 20, bold: true, color: C.teal, align: "center", valign: "middle" });
    s.addText(h, { x: x + 1.05, y: y + 0.16, w: colW - 1.25, h: 0.4, margin: 0, fontFace: FONT, fontSize: 15, bold: true, color: C.textStrong, valign: "top" });
    s.addText(b, { x: x + 1.05, y: y + 0.56, w: colW - 1.25, h: 0.66, margin: 0, fontFace: FONT, fontSize: 11.5, color: C.body, valign: "top", lineSpacingMultiple: 1.08 });
  });
  s.addNotes("Five trends: generation over extraction, multimodal convergence, provenance as a requirement, hybrid architectures in regulated settings, and privacy-preserving deployment.");
})();

// =====================================================================
// 5 — THE PROJECT (pipeline + Overview screenshot)
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "The project · VisitPrep");
  title(s, "The clinical-NLP value chain, end to end");
  divider(s); footer(s, SN);

  const lw = 4.05;
  s.addText("A local Next.js / TypeScript app. A patient on GLP-1 injections logs daily notes and wearable metrics; VisitPrep prepares a source-grounded pre-visit summary.", { x: MX, y: 1.95, w: lw, h: 1.2, margin: 0, fontFace: FONT, fontSize: 12.5, color: C.body, valign: "top", lineSpacingMultiple: 1.18 });

  // vertical pipeline
  const steps = [["1", "Unstructured note"], ["2", "Structured signals"], ["3", "Trend analytics"], ["4", "Doctor-ready summary"]];
  let py = 3.35; const ph = 0.62, pgap = 0.28;
  steps.forEach(([nn, t], i) => {
    const last = i === steps.length - 1;
    card(s, MX, py, lw, ph, { fill: last ? C.teal : C.surface, line: last ? C.teal : C.border });
    s.addText(nn, { x: MX + 0.18, y: py, w: 0.4, h: ph, margin: 0, fontFace: FONT, fontSize: 13, bold: true, color: last ? "cde9e4" : C.teal, valign: "middle" });
    s.addText(t, { x: MX + 0.62, y: py, w: lw - 0.8, h: ph, margin: 0, fontFace: FONT, fontSize: 13.5, bold: true, color: last ? "ffffff" : C.textStrong, valign: "middle" });
    if (!last) s.addText("↓", { x: MX + lw / 2 - 0.2, y: py + ph - 0.02, w: 0.4, h: pgap, margin: 0, fontFace: FONT, fontSize: 15, bold: true, color: C.teal, align: "center", valign: "middle" });
    py += ph + pgap;
  });

  shot(s, "overview.png", 5.0, 1.95, 7.6);
  s.addText("Overview — journal capture with local signal extraction, KPIs, and a persistent safety boundary.", { x: 5.0, y: 6.78, w: 7.6, h: 0.35, margin: 0, fontFace: FONT, fontSize: 10.5, italic: true, color: C.muted, align: "left", valign: "middle" });
  s.addNotes("This is the running app. The pipeline goes from an unstructured note to structured signals to analytics to a doctor-ready summary. Everything runs locally and is traceable to the source text.");
})();

// =====================================================================
// 6 — CAPTURING EVIDENCE (Journal screenshot)
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "Capturing evidence");
  title(s, "Every note, its extracted signals");
  divider(s); footer(s, SN);

  const lw = 4.05;
  s.addText(bullets([
    "Each patient note is shown with the symptom signals extracted from it.",
    "Signals are color-coded by severity (mild → severe).",
    "Injection days and “severe reported” days are flagged inline.",
    "Every chip traces back to a phrase in the note — nothing is inferred without a source.",
  ], 13), { x: MX, y: 2.05, w: lw, h: 4.2, margin: 0, valign: "top" });

  shot(s, "journal.png", 5.0, 1.95, 7.6);
  s.addText("Journal — a per-note timeline of extracted symptom signals.", { x: 5.0, y: 6.78, w: 7.6, h: 0.35, margin: 0, fontFace: FONT, fontSize: 10.5, italic: true, color: C.muted, align: "left", valign: "middle" });
  s.addNotes("The journal view makes the raw evidence browsable: each note with its extracted, severity-coded symptom chips and injection markers.");
})();

// =====================================================================
// 7 — ARCHITECTURE (4 layers)
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "Architecture");
  title(s, "Four layers — auditable NLP separated from presentation");
  divider(s); footer(s, SN);
  const layers = [
    { n: "1", t: "Data layer", d: "Typed JournalEntry + WearableMetrics; synthetic JSON (no PHI). Wearable data kept separate from journal text.", tag: "typed · synthetic · no PHI" },
    { n: "2", t: "NLP extraction layer  ·  src/lib/nlp/", d: "Deterministic, rule-based, auditable: 14 symptoms / 7 categories; assertion (present · absent · uncertain · resolved); severity; temporal + injection context; evidence span + confidence on every signal.", tag: "extractionMethod: \"rule-based\" — interface allows semantic-local / hybrid later" },
    { n: "3", t: "Analytics layer  ·  src/lib/analytics/", d: "Symptom frequency, top symptoms, category mix, severity distribution, injection-adjacent analysis, wearable trends (weight, sleep, steps, RHR, activity).", tag: "deterministic analytics" },
    { n: "4", t: "Report layer  ·  src/lib/report/", d: "Template summary: snapshot, medication context, symptom & wearable highlights, evidence notes with source text, discussion prompts, safety disclaimer.", tag: "built from computed data, never live UI state" },
  ];
  const totalW = W - 2 * MX, y0 = 2.1, rh = 1.02, gap = 0.14;
  layers.forEach((l, i) => {
    const y = y0 + i * (rh + gap);
    const isNlp = i === 1;
    card(s, MX, y, totalW, rh, { fill: isNlp ? C.teal50 : C.surface, line: isNlp ? C.teal : C.border, shadow: true });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX + 0.22, y: y + 0.24, w: 0.55, h: 0.55, rectRadius: 0.08, fill: { color: isNlp ? C.teal : C.tealDeep }, line: { type: "none" } });
    s.addText(l.n, { x: MX + 0.22, y: y + 0.24, w: 0.55, h: 0.55, margin: 0, fontFace: FONT, fontSize: 20, bold: true, color: "ffffff", align: "center", valign: "middle" });
    s.addText(l.t, { x: MX + 1.0, y: y + 0.13, w: 5.2, h: 0.4, margin: 0, fontFace: FONT, fontSize: 15, bold: true, color: isNlp ? C.tealDeep : C.textStrong, valign: "top" });
    s.addText(l.tag, { x: MX + 1.0, y: y + 0.55, w: 5.2, h: 0.4, margin: 0, fontFace: FONT, fontSize: 9.5, italic: true, color: isNlp ? C.teal : C.muted, valign: "top", lineSpacingMultiple: 1.0 });
    s.addText(l.d, { x: MX + 6.4, y: y + 0.14, w: totalW - 6.6, h: 0.78, margin: 0, fontFace: FONT, fontSize: 11.5, color: C.body, valign: "middle", lineSpacingMultiple: 1.08 });
  });
  s.addText([
    { text: "Hybrid-ready, provenance-first.  ", options: { bold: true, color: C.tealDeep } },
    { text: "Neural methods can be layered in behind the same typed interfaces without losing the audit trail.", options: { color: C.body } },
  ], { x: MX, y: 6.75, w: totalW, h: 0.45, margin: 0, fontFace: FONT, fontSize: 12.5, valign: "middle" });
  s.addNotes("Four layers, with the auditable extraction kept fully separate from the UI. The report is built from computed data, never from live UI state, so an export is reproducible.");
})();

// =====================================================================
// 8 — INSIDE THE NLP PIPELINE (7 steps)
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "Inside the NLP pipeline");
  title(s, "Seven deterministic steps, each traceable to source");
  divider(s); footer(s, SN);
  const steps = [
    ["Sentence spanning", "Split the note into spans that keep absolute character offsets."],
    ["Dictionary matching", "14 symptoms / 7 categories, weighted aliases, word-boundary aware."],
    ["Assertion detection", "present / absent / uncertain / resolved — clause-aware negation."],
    ["Severity detection", "mild / moderate / severe from phrases; self-rating fallback."],
    ["Temporal + injection context", "Time-of-day tags; symptom within ~48h of an injection."],
    ["Evidence span + confidence", "Exact source span, matched text, and a score on every signal."],
    ["Deduplicate & rank", "Best candidate per symptom; a present mention beats a negated one."],
  ];
  const colW = 5.85, gapX = 0.35, rowH = 0.92, gapY = 0.12, y0 = 2.05;
  steps.forEach(([h, b], i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = MX + col * (colW + gapX);
    const y = y0 + row * (rowH + gapY);
    const hot = i === 2;
    card(s, x, y, colW, rowH, { fill: hot ? C.teal50 : C.surface, line: hot ? C.teal : C.border, shadow: true });
    s.addShape(pres.shapes.OVAL, { x: x + 0.2, y: y + 0.2, w: 0.52, h: 0.52, fill: { color: hot ? C.teal : C.tealDeep }, line: { type: "none" } });
    s.addText(String(i + 1), { x: x + 0.2, y: y + 0.2, w: 0.52, h: 0.52, margin: 0, fontFace: FONT, fontSize: 16, bold: true, color: "ffffff", align: "center", valign: "middle" });
    s.addText(h, { x: x + 0.9, y: y + 0.13, w: colW - 1.1, h: 0.36, margin: 0, fontFace: FONT, fontSize: 14, bold: true, color: hot ? C.tealDeep : C.textStrong, valign: "top" });
    s.addText(b, { x: x + 0.9, y: y + 0.48, w: colW - 1.1, h: 0.4, margin: 0, fontFace: FONT, fontSize: 11, color: C.body, valign: "top", lineSpacingMultiple: 1.05 });
  });
  // highlight box in the empty 8th cell
  const x = MX + colW + gapX, y = y0 + 3 * (rowH + gapY);
  card(s, x, y, colW, rowH, { fill: C.canvas, line: C.border });
  s.addText([
    { text: "Hardening:  ", options: { bold: true, color: C.tealDeep } },
    { text: "word-boundary negation, contraction handling, clause-aware scope, assertion-aware ranking.", options: { color: C.body } },
  ], { x: x + 0.25, y: y + 0.12, w: colW - 0.5, h: rowH - 0.24, margin: 0, fontFace: FONT, fontSize: 11.5, valign: "middle", lineSpacingMultiple: 1.1 });
  s.addNotes("Extraction is seven deterministic steps. The hard part is assertion detection — negation is clause-aware, so 'No vomiting since breakfast, but I vomited after lunch' is correctly read as present.");
})();

// =====================================================================
// 9 — ANALYTICS (screenshot)
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "Analytics");
  title(s, "Deterministic trends from the extracted signals");
  divider(s); footer(s, SN);
  const lw = 4.05;
  s.addText(bullets([
    "Symptom frequency and category mix across the review window.",
    "Weight, sleep, resting heart rate, steps and active minutes.",
    "Week-1 vs week-4 averages for each wearable metric.",
    "A symptom-severity timeline; injection-adjacent symptom breakdown.",
    "Charts mapped to the clinical design tokens — restrained, not decorative.",
  ], 12.5), { x: MX, y: 2.05, w: lw, h: 4.3, margin: 0, valign: "top" });
  shot(s, "analytics.png", 5.0, 1.95, 7.6);
  s.addText("Analytics — frequency, wearable trends, and a severity timeline.", { x: 5.0, y: 6.78, w: 7.6, h: 0.35, margin: 0, fontFace: FONT, fontSize: 10.5, italic: true, color: C.muted, align: "left", valign: "middle" });
  s.addNotes("Analytics aggregates the extracted signals into frequencies, distributions, and wearable trends — all computed deterministically, then charted with the clinical palette.");
})();

// =====================================================================
// 10 — DOCTOR-READY OUTPUT (screenshot)
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "Doctor-ready output");
  title(s, "A source-grounded summary — every claim traces to a note");
  divider(s); footer(s, SN);
  const lw = 4.05;
  s.addText(bullets([
    "Snapshot, GLP-1 medication context, and injection-adjacency.",
    "Wearable telemetry summary and discussion prompts.",
    "Evidence notes selected by a transparent scoring algorithm.",
    "Each note shown verbatim with the matched phrase highlighted.",
    "A safety disclaimer is always included; language stays hedged.",
  ], 12.5), { x: MX, y: 2.05, w: lw, h: 4.3, margin: 0, valign: "top" });
  shot(s, "doctor-report.png", 5.0, 1.95, 7.6);
  s.addText("Doctor Report — traceable evidence with the matched phrase highlighted.", { x: 5.0, y: 6.78, w: 7.6, h: 0.35, margin: 0, fontFace: FONT, fontSize: 10.5, italic: true, color: C.muted, align: "left", valign: "middle" });
  s.addNotes("The doctor report is assembled deterministically. Evidence notes are chosen by a scoring algorithm that favors signal-rich, injection-adjacent days and diverse symptoms, and each is shown verbatim with the matched phrase highlighted.");
})();

// =====================================================================
// 11 — RESULTS & ENGINEERING
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "Results & engineering");
  title(s, "Evaluation metrics & NLP hardening");
  divider(s); footer(s, SN);
  const totalW = W - 2 * MX;
  const metrics = [["1.00", "Precision"], ["1.00", "Recall"], ["1.00", "F1"], ["0.94", "Severity acc."], ["1.00", "Evidence span"], ["0", "Negation FP"]];
  const n = metrics.length, gap = 0.2;
  const mw = (totalW - gap * (n - 1)) / n;
  const my = 2.05, mh = 1.35;
  metrics.forEach(([v, l], i) => {
    const x = MX + i * (mw + gap);
    card(s, x, my, mw, mh, { fill: C.teal50, line: C.teal50, shadow: true });
    s.addText(v, { x, y: my + 0.16, w: mw, h: 0.7, margin: 0, fontFace: FONT, fontSize: 34, bold: true, color: C.teal, align: "center", valign: "middle" });
    s.addText(l, { x: x + 0.05, y: my + 0.92, w: mw - 0.1, h: 0.35, margin: 0, fontFace: FONT, fontSize: 11, color: C.body, align: "center", valign: "middle" });
  });
  s.addText("npm run nlp:evaluate  ·  150 synthetic entries / 156 signals  ·  injection-context accuracy 1.00", { x: MX, y: my + mh + 0.06, w: totalW, h: 0.3, margin: 0, fontFace: FONT, fontSize: 11, italic: true, color: C.muted, align: "center", valign: "middle" });
  const hw = 7.9, cw = totalW - hw - 0.35, hy = 4.05, hh = 2.65;
  card(s, MX, hy, hw, hh, { shadow: true });
  s.addText("NLP ROBUSTNESS HARDENING", { x: MX + 0.3, y: hy + 0.22, w: hw - 0.6, h: 0.35, margin: 0, fontFace: FONT, fontSize: 12, bold: true, color: C.teal, charSpacing: 1.5, valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: MX + 0.3, y: hy + 0.62, w: hw - 0.6, h: 0, line: { color: C.border, width: 1 } });
  const harden = [
    "Fixed substring-negation bug — “no”/“not” no longer fire inside words like “normal”/“nothing”.",
    "Added negation contractions (“don’t have”, “isn’t”) that were previously missed.",
    "Made negation lookback clause-aware (stops at but / however / , / ;).",
    "Made candidate ranking assertion-aware so a present mention beats an earlier negated one.",
    "Tightened over-broad dictionary aliases that caused false positives.",
  ];
  s.addText(harden.map((t) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, breakLine: true, color: C.body, fontFace: FONT, fontSize: 11.5, paraSpaceAfter: 8, lineSpacingMultiple: 1.05 } })), { x: MX + 0.35, y: hy + 0.78, w: hw - 0.7, h: hh - 0.95, margin: 0, valign: "top" });
  const cx = MX + hw + 0.35;
  card(s, cx, hy, cw, hh, { fill: C.amberTint, line: C.amberTint, shadow: true });
  s.addText("HONESTY CAVEAT", { x: cx + 0.28, y: hy + 0.22, w: cw - 0.56, h: 0.35, margin: 0, fontFace: FONT, fontSize: 12, bold: true, color: C.amber, charSpacing: 1.5, valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: cx + 0.28, y: hy + 0.62, w: cw - 0.56, h: 0, line: { color: C.amber, width: 1 } });
  s.addText("These metrics are on a curated synthetic dataset the rules were tuned against. They demonstrate correctness of the pipeline — not real-world generalization.", { x: cx + 0.28, y: hy + 0.78, w: cw - 0.56, h: hh - 1.0, margin: 0, fontFace: FONT, fontSize: 13, color: C.body, valign: "top", lineSpacingMultiple: 1.2 });
  s.addNotes("On the synthetic evaluation set the pipeline scores perfectly on precision, recall, and F1, with strong severity accuracy and full evidence-span coverage. I want to be honest: this is a curated synthetic set the rules were tuned against, so it shows correctness, not generalization.");
})();

// =====================================================================
// 12 — REFLECTION & FUTURE WORK
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++;
  s.background = { color: C.tealDeep };
  s.addText("REFLECTION & FUTURE WORK", { x: MX, y: 0.7, w: 11, h: 0.4, margin: 0, fontFace: FONT, fontSize: 12, bold: true, color: C.teal50, charSpacing: 3, valign: "middle" });
  s.addText("A deterministic, provenance-first system can deliver the whole value chain", { x: MX, y: 1.15, w: 12, h: 1.0, margin: 0, fontFace: FONT, fontSize: 27, bold: true, color: "ffffff", valign: "top", lineSpacingMultiple: 1.03 });

  const apps = [
    ["What it demonstrates", "Capture → extraction → analytics → summary, auditable end to end, with a source span on every signal."],
    ["The trade-off", "Rule-based methods are transparent and cheap but bounded in coverage; neural methods add recall at the cost of auditability."],
    ["Future work", "Local sentence embeddings + MMR for semantic evidence; hybrid neural recall behind the same interfaces; OCR intake."],
  ];
  const n = 3, gap = 0.35, totalW = W - 2 * MX;
  const cw = (totalW - gap * (n - 1)) / n;
  const y = 2.55, ch = 1.95;
  apps.forEach(([h, b], i) => {
    const x = MX + i * (cw + gap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, rectRadius: 0.08, fill: { color: "0f5a51" }, line: { color: "156b60", width: 1 } });
    s.addText(h, { x: x + 0.28, y: y + 0.24, w: cw - 0.56, h: 0.45, margin: 0, fontFace: FONT, fontSize: 16, bold: true, color: "ffffff", valign: "top" });
    s.addText(b, { x: x + 0.28, y: y + 0.78, w: cw - 0.56, h: 1.05, margin: 0, fontFace: FONT, fontSize: 12, color: "cfe4e0", valign: "top", lineSpacingMultiple: 1.15 });
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX, y: 4.85, w: totalW, h: 1.5, rectRadius: 0.08, fill: { color: "093f39" }, line: { color: "156b60", width: 1 } });
  s.addText("SAFETY BOUNDARIES", { x: MX + 0.35, y: 5.03, w: totalW - 0.7, h: 0.35, margin: 0, fontFace: FONT, fontSize: 11.5, bold: true, color: "f0b96a", charSpacing: 2, valign: "middle" });
  s.addText([
    { text: "No diagnosis · no treatment or medication advice · no emergency triage.   ", options: { color: "ffffff", bold: true } },
    { text: "Hedged language (“reported”, “overlapped with”, “may be useful to discuss”). Synthetic data only. No external model or API calls.", options: { color: "d7ece8" } },
  ], { x: MX + 0.35, y: 5.42, w: totalW - 0.7, h: 0.85, margin: 0, fontFace: FONT, fontSize: 14, valign: "top", lineSpacingMultiple: 1.2 });

  s.addText("Shubham Pareek — Columbia University   ·   Intern Assessment · Topic 1", { x: MX, y: 6.6, w: totalW, h: 0.35, margin: 0, fontFace: FONT, fontSize: 11, color: "9ec4bd", valign: "middle" });
  s.addNotes("To close: the project shows that a deterministic, provenance-first system can deliver the full clinical-NLP value chain, auditable end to end. The roadmap adds neural recall behind the same interfaces without giving up the audit trail — and it stays inside clear safety boundaries.");
})();

pres.writeFile({ fileName: "/Users/shubhampareek/Documents/Cotivit/deliverables/VisitPrep_Clinical_NLP_Deck.pptx" })
  .then((fn) => console.log("WROTE " + fn + " · slides=" + SN));
