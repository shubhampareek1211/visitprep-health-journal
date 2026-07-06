const pptxgen = require("pptxgenjs");

// ---------- VisitPrep design tokens ----------
const C = {
  teal:      "0e7466", // accent / primary
  teal500:   "128a78", // accent-500
  tealDeep:  "0a4942",
  teal50:    "e9f6f3", // tint
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
  // data viz
  dvTeal:    "128a78",
  dvSlate:   "5a7480",
  dvAmber:   "c07d11",
  dvSand:    "b08a5a",
  dvClay:    "b5675a",
  cotiviti:  "B0197F",
};
const FONT = "Public Sans";

const pres = new pptxgen();
pres.defineLayout({ name: "W", width: 13.333, height: 7.5 });
pres.layout = "W";
pres.author = "Shubham Pareek";
pres.title = "VisitPrep — Clinical Natural Language Technology for Health Care";

const W = 13.333, H = 7.5;
const MX = 0.7; // margin x
const shadow = () => ({ type: "outer", color: "9aa5aa", blur: 7, offset: 3, angle: 90, opacity: 0.18 });

// ---------- helpers ----------
function base(slide) {
  slide.background = { color: C.surface };
}

function eyebrow(slide, text, x = MX, y = 0.5) {
  slide.addText(text.toUpperCase(), {
    x, y, w: 8, h: 0.3, margin: 0,
    fontFace: FONT, fontSize: 11, bold: true, color: C.teal,
    charSpacing: 2, align: "left", valign: "middle",
  });
}

function title(slide, text, x = MX, y = 0.82, w = 12, size = 30) {
  slide.addText(text, {
    x, y, w, h: 0.8, margin: 0,
    fontFace: FONT, fontSize: size, bold: true, color: C.textStrong,
    align: "left", valign: "top",
  });
}

// thin divider under header
function divider(slide, y = 1.68, x = MX, w = W - 2 * MX) {
  slide.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color: C.border, width: 1 } });
}

function footer(slide, n) {
  slide.addText("VisitPrep · Clinical NLP for Health Care", {
    x: MX, y: H - 0.42, w: 8, h: 0.3, margin: 0,
    fontFace: FONT, fontSize: 8.5, color: C.muted, align: "left", valign: "middle",
  });
  slide.addText(String(n), {
    x: W - 1.2, y: H - 0.42, w: 0.5, h: 0.3, margin: 0,
    fontFace: FONT, fontSize: 8.5, color: C.muted, align: "right", valign: "middle",
  });
}

function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: opts.fill || C.surface },
    line: { color: opts.line || C.border, width: 1 },
    shadow: opts.shadow ? shadow() : undefined,
  });
}

let SN = 0;
const bullets = (arr) => arr.map((t, i) => ({
  text: t, options: { bullet: { code: "2022", indent: 14 }, breakLine: true, color: C.body,
    fontFace: FONT, fontSize: 14, paraSpaceAfter: 8 }
}));

// =====================================================================
// SLIDE 1 — TITLE
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++;
  s.background = { color: C.tealDeep };

  // subtle darker panel accent (no stripe): use teal accent block as brandmark
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: MX, y: 1.55, w: 0.62, h: 0.62, rectRadius: 0.1,
    fill: { color: C.teal500 }, line: { type: "none" },
  });
  s.addText("VP", {
    x: MX, y: 1.55, w: 0.62, h: 0.62, margin: 0,
    fontFace: FONT, fontSize: 20, bold: true, color: "ffffff", align: "center", valign: "middle",
  });

  s.addText("CLINICAL NATURAL LANGUAGE TECHNOLOGY", {
    x: 1.45, y: 1.62, w: 10, h: 0.4, margin: 0,
    fontFace: FONT, fontSize: 12.5, bold: true, color: C.teal50, charSpacing: 3, valign: "middle",
  });

  s.addText([
    { text: "VisitPrep", options: { color: "ffffff", bold: true } },
    { text: "  —  Clinical Natural Language Technology for Health Care", options: { color: "d7ece8" } },
  ], {
    x: MX, y: 2.35, w: 12.1, h: 1.5, margin: 0,
    fontFace: FONT, fontSize: 40, bold: true, align: "left", valign: "top", lineSpacingMultiple: 1.02,
  });

  s.addText("Past, Present & Future  ·  NLP · OCR · Computer Vision · LLM · LMM", {
    x: MX, y: 4.0, w: 12, h: 0.5, margin: 0,
    fontFace: FONT, fontSize: 17, color: C.teal50, align: "left", valign: "middle",
  });

  // divider line
  s.addShape(pres.shapes.LINE, { x: MX, y: 4.85, w: 5.2, h: 0, line: { color: C.teal500, width: 1.5 } });

  s.addText([
    { text: "Shubham Pareek", options: { bold: true, color: "ffffff" } },
    { text: "  —  Columbia University", options: { color: "cfe4e0" } },
  ], {
    x: MX, y: 5.15, w: 12, h: 0.45, margin: 0,
    fontFace: FONT, fontSize: 16, align: "left", valign: "middle",
  });

  s.addText([
    { text: "Cotiviti", options: { bold: true, color: C.cotiviti } },
    { text: " Intern Assessment  ·  Topic 1", options: { color: "b9d6d1" } },
  ], {
    x: MX, y: 5.62, w: 12, h: 0.4, margin: 0,
    fontFace: FONT, fontSize: 13.5, align: "left", valign: "middle",
  });

  s.addText("Local, source-grounded, provenance-first proof of concept  ·  synthetic data only", {
    x: MX, y: 6.75, w: 12, h: 0.3, margin: 0,
    fontFace: FONT, fontSize: 10.5, italic: true, color: "9ec4bd", align: "left", valign: "middle",
  });
})();

// =====================================================================
// SLIDE 2 — THE PROBLEM
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "The problem");
  title(s, "Most clinical data is unstructured text");
  divider(s);
  footer(s, SN);

  // Left: big stat callout
  card(s, MX, 2.1, 4.6, 4.5, { fill: C.teal50, line: C.teal50, shadow: true });
  s.addText("~80%", {
    x: MX + 0.2, y: 2.6, w: 4.2, h: 1.4, margin: 0,
    fontFace: FONT, fontSize: 84, bold: true, color: C.teal, align: "center", valign: "middle",
  });
  s.addText("of clinical data is unstructured — physician notes, patient narratives, discharge summaries, scanned documents and images with text.", {
    x: MX + 0.35, y: 4.05, w: 3.9, h: 1.6, margin: 0,
    fontFace: FONT, fontSize: 15, color: C.body, align: "center", valign: "top", lineSpacingMultiple: 1.15,
  });
  s.addText("~half of provider–payer exchange still moves as fax / PDF", {
    x: MX + 0.35, y: 5.7, w: 3.9, h: 0.7, margin: 0,
    fontFace: FONT, fontSize: 12, italic: true, color: C.teal500, align: "center", valign: "middle",
  });

  // Right: three problem points
  const items = [
    ["Providers & payers drown in documents", "Notes, faxes and PDFs pile up faster than teams can read them by hand."],
    ["Structured claims miss the story", "Diagnoses, symptoms and quality evidence live in the free text, not the coded fields."],
    ["Manual review does not scale", "Reading records at claims scale is slow, costly and inconsistent."],
  ];
  let y = 2.1;
  const cw = 6.9, ch = 1.4, gap = 0.15;
  items.forEach(([h, b], i) => {
    const yy = y + i * (ch + gap);
    card(s, 5.75, yy, cw, ch, { shadow: true });
    s.addText(h, {
      x: 5.95, y: yy + 0.16, w: cw - 0.4, h: 0.4, margin: 0,
      fontFace: FONT, fontSize: 15.5, bold: true, color: C.textStrong, valign: "top",
    });
    s.addText(b, {
      x: 5.95, y: yy + 0.6, w: cw - 0.4, h: 0.7, margin: 0,
      fontFace: FONT, fontSize: 12.5, color: C.body, valign: "top", lineSpacingMultiple: 1.1,
    });
  });

  s.addText("Clinical NLP is how healthcare converts that unstructured text into decisions, payments and quality measures.", {
    x: 5.75, y: 6.35, w: cw, h: 0.5, margin: 0,
    fontFace: FONT, fontSize: 12.5, italic: true, color: C.tealDeep, valign: "middle",
  });
})();

// =====================================================================
// SLIDE 3 — WHAT CLINICAL NLP IS (five layers)
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "What clinical NLP is");
  title(s, "Five capability layers, text to computable data");
  divider(s);
  footer(s, SN);

  const layers = [
    ["NLP", "Parse free text into concepts, assertions (present / absent / uncertain) and relations. The foundation."],
    ["OCR", "Convert scanned faxes, PDFs and handwritten or printed documents into machine-readable text."],
    ["Computer Vision", "Extract signal from medical images and document layout — tables, fields, stamps, signatures."],
    ["LLM", "Transformer models (BERT → GPT-4 class) that summarize, abstract and reason with less task engineering."],
    ["LMM", "Large multimodal models reasoning jointly over text + images + structured data — the research frontier."],
  ];
  const n = layers.length;
  const totalW = W - 2 * MX;
  const gap = 0.22;
  const cw = (totalW - gap * (n - 1)) / n;
  const y = 2.25, ch = 3.9;
  layers.forEach(([h, b], i) => {
    const x = MX + i * (cw + gap);
    card(s, x, y, cw, ch, { shadow: true });
    // number chip
    s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: y + 0.3, w: 0.5, h: 0.5, fill: { color: C.teal }, line: { type: "none" } });
    s.addText(String(i + 1), { x: x + 0.25, y: y + 0.3, w: 0.5, h: 0.5, margin: 0, fontFace: FONT, fontSize: 16, bold: true, color: "ffffff", align: "center", valign: "middle" });
    s.addText(h, {
      x: x + 0.2, y: y + 0.95, w: cw - 0.4, h: 0.9, margin: 0,
      fontFace: FONT, fontSize: h.length > 5 ? 15 : 20, bold: true, color: C.teal, valign: "top", lineSpacingMultiple: 1.0,
    });
    s.addText(b, {
      x: x + 0.2, y: y + 1.75, w: cw - 0.4, h: 2.0, margin: 0,
      fontFace: FONT, fontSize: 11.5, color: C.body, valign: "top", lineSpacingMultiple: 1.12,
    });
  });

  s.addText("Clinical NLP turns the ~80% of clinical data that is unstructured text into decisions, payments and quality measures.", {
    x: MX, y: 6.45, w: totalW, h: 0.5, margin: 0,
    fontFace: FONT, fontSize: 13, italic: true, color: C.tealDeep, align: "center", valign: "middle",
  });
})();

// =====================================================================
// SLIDE 4 — PAST -> PRESENT -> FUTURE
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "The arc");
  title(s, "Past → Present → Future");
  divider(s);
  footer(s, SN);

  const cols = [
    { tag: "PAST · ~2000–2015", head: "Rule-based & statistical",
      pts: ["UMLS dictionary / ontology lookup — MetaMap, cTAKES",
            "Hand-built rules, regex, negation (NegEx), assertions",
            "Shared tasks: i2b2 / n2c2 challenges"],
      note: "Transparent, auditable, cheap — but brittle to phrasing.", fill: C.sunken, tagColor: C.muted },
    { tag: "PRESENT · ~2018–now", head: "Transformer era",
      pts: ["BERT → BioBERT, ClinicalBERT (on MIMIC-III)",
            "Generative LLMs; Med-PaLM passes medical QA",
            "Vision: CheXNet; document AI fuses OCR + layout"],
      note: "State-of-the-art — but hallucination, opacity, PHI risk.", fill: C.teal50, tagColor: C.teal },
    { tag: "FUTURE", head: "Multimodal, agentic, governed",
      pts: ["LMMs over notes + images + labs + claims",
            "Retrieval-grounded / agentic pipelines that cite spans",
            "Hybrid deterministic + neural, governance-first"],
      note: "Neural recall with deterministic guardrails.", fill: C.surface, tagColor: C.teal500 },
  ];
  const n = cols.length, gap = 0.35;
  const totalW = W - 2 * MX;
  const cw = (totalW - gap * (n - 1)) / n;
  const y = 2.2, ch = 4.35;

  cols.forEach((c, i) => {
    const x = MX + i * (cw + gap);
    card(s, x, y, cw, ch, { fill: c.fill, shadow: true });
    s.addText(c.tag, {
      x: x + 0.28, y: y + 0.28, w: cw - 0.56, h: 0.35, margin: 0,
      fontFace: FONT, fontSize: 11, bold: true, color: c.tagColor, charSpacing: 1, valign: "middle",
    });
    s.addText(c.head, {
      x: x + 0.28, y: y + 0.68, w: cw - 0.56, h: 0.7, margin: 0,
      fontFace: FONT, fontSize: 18, bold: true, color: C.textStrong, valign: "top", lineSpacingMultiple: 1.0,
    });
    s.addText(bullets(c.pts), {
      x: x + 0.28, y: y + 1.55, w: cw - 0.5, h: 2.0, margin: 0, valign: "top",
    });
    s.addText(c.note, {
      x: x + 0.28, y: y + ch - 0.85, w: cw - 0.56, h: 0.7, margin: 0,
      fontFace: FONT, fontSize: 11.5, italic: true, color: C.body, valign: "top", lineSpacingMultiple: 1.1,
    });
  });

  // arrows between columns
  [0, 1].forEach((i) => {
    const ax = MX + (i + 1) * cw + i * gap + 0.02;
    s.addText("→", { x: ax, y: y + ch / 2 - 0.3, w: gap - 0.04, h: 0.6, margin: 0, fontFace: FONT, fontSize: 22, bold: true, color: C.teal, align: "center", valign: "middle" });
  });
})();

// =====================================================================
// SLIDE 5 — TRENDS
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "Trends");
  title(s, "Where clinical NLP is heading");
  divider(s);
  footer(s, SN);

  const trends = [
    ["From extraction to generation", "Value shifts from tagging concepts to summarizing and drafting — ambient scribes, prior-auth letters, appeal narratives."],
    ["Multimodal + document AI converge", "OCR + CV + NLP merge into one document-understanding stack for the fax / PDF reality of payer operations."],
    ["Grounding & provenance are required", "Regulators, clinicians and auditors demand source-linked evidence; ungrounded generation is a liability."],
    ["Hybrid architectures win in regulated settings", "Deterministic guardrails wrap neural models to keep outputs auditable and safe."],
    ["Privacy-preserving / on-prem deployment", "De-identification, local models and data-residency controls become table stakes for PHI."],
  ];
  // 2 columns x rows
  const colW = 5.85, gapX = 0.35, rowH = 1.28, gapY = 0.18;
  const startX = MX, startY = 2.15;
  trends.forEach(([h, b], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    // 5th spans wider centered on bottom left? keep grid: index 4 sits col0 row2
    const x = startX + col * (colW + gapX);
    const y = startY + row * (rowH + gapY);
    card(s, x, y, colW, rowH, { shadow: true });
    // number
    s.addShape(pres.shapes.OVAL, { x: x + 0.22, y: y + 0.24, w: 0.62, h: 0.62, fill: { color: C.teal50 }, line: { color: C.teal, width: 1 } });
    s.addText(String(i + 1), { x: x + 0.22, y: y + 0.24, w: 0.62, h: 0.62, margin: 0, fontFace: FONT, fontSize: 20, bold: true, color: C.teal, align: "center", valign: "middle" });
    s.addText(h, {
      x: x + 1.05, y: y + 0.16, w: colW - 1.25, h: 0.4, margin: 0,
      fontFace: FONT, fontSize: 15, bold: true, color: C.textStrong, valign: "top",
    });
    s.addText(b, {
      x: x + 1.05, y: y + 0.56, w: colW - 1.25, h: 0.66, margin: 0,
      fontFace: FONT, fontSize: 11.5, color: C.body, valign: "top", lineSpacingMultiple: 1.08,
    });
  });
})();

// =====================================================================
// SLIDE 6 — OPPORTUNITIES & THREATS
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "For Cotiviti");
  title(s, "Opportunities & threats");
  divider(s);
  footer(s, SN);

  const opps = [
    "Risk-adjustment coding (HCC): surface supported / unsupported diagnosis codes",
    "Payment integrity & clinical validation: validate claims against documentation",
    "Quality measurement (HEDIS-style): extract evidence structured claims miss",
    "Grounded summarization of policy, contracts and appeals for providers & members",
    "Document AI for the fax / PDF backlog: OCR + layout to structure records",
  ];
  const threats = [
    "Hallucination & fabricated evidence → compliance and audit exposure",
    "PHI / privacy & regulatory risk (HIPAA de-id, 21st Century Cures)",
    "Auditability gap: black-box models hard to defend in disputes",
    "Data drift & bias: models degrade across populations",
    "Vendor / compute cost & lock-in for frontier LLMs at claims scale",
  ];

  const colW = 5.85, gapX = 0.35, y = 2.15, ch = 4.4;
  // Opportunities card
  card(s, MX, y, colW, ch, { fill: C.teal50, line: C.teal50, shadow: true });
  s.addText("OPPORTUNITIES", { x: MX + 0.3, y: y + 0.25, w: colW - 0.6, h: 0.4, margin: 0, fontFace: FONT, fontSize: 13, bold: true, color: C.teal, charSpacing: 2, valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: MX + 0.3, y: y + 0.72, w: colW - 0.6, h: 0, line: { color: C.teal, width: 1 } });
  s.addText(opps.map((t) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, breakLine: true, color: C.body, fontFace: FONT, fontSize: 13, paraSpaceAfter: 13, lineSpacingMultiple: 1.05 } })), {
    x: MX + 0.35, y: y + 0.95, w: colW - 0.65, h: ch - 1.2, margin: 0, valign: "top",
  });

  // Threats card
  const tx = MX + colW + gapX;
  card(s, tx, y, colW, ch, { fill: C.redTint, line: C.redTint, shadow: true });
  s.addText("THREATS / RISKS", { x: tx + 0.3, y: y + 0.25, w: colW - 0.6, h: 0.4, margin: 0, fontFace: FONT, fontSize: 13, bold: true, color: C.red, charSpacing: 2, valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: tx + 0.3, y: y + 0.72, w: colW - 0.6, h: 0, line: { color: C.red, width: 1 } });
  s.addText(threats.map((t) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, breakLine: true, color: C.body, fontFace: FONT, fontSize: 13, paraSpaceAfter: 13, lineSpacingMultiple: 1.05 } })), {
    x: tx + 0.35, y: y + 0.95, w: colW - 0.65, h: ch - 1.2, margin: 0, valign: "top",
  });
})();

// =====================================================================
// SLIDE 7 — STRATEGIC OPTIONS A / B / C
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "Strategic options for Cotiviti");
  title(s, "Three tiers of investment");
  divider(s);
  footer(s, SN);

  const opts = [
    { tag: "OPTION A · RECOMMENDED", head: "Hybrid, provenance-first extraction",
      risk: "Low risk",
      body: "Deterministic rule / dictionary layer for auditable structured signals + optional local neural recall. Every output carries a visible source span. Directly applicable to risk adjustment and clinical validation.",
      poc: "This is what the POC demonstrates.", accent: C.teal, fill: C.teal50, rec: true },
    { tag: "OPTION B", head: "Grounded summarization & drafting",
      risk: "Medium risk",
      body: "Retrieval-grounded LLM assistance for appeal letters, clinical review narratives and policy comparison — always source-linked and human-approved.",
      poc: "Layer in where human review already exists.", accent: C.teal500, fill: C.surface, rec: false },
    { tag: "OPTION C", head: "Multimodal document AI platform",
      risk: "Higher investment · strategic",
      body: "Unify OCR + CV + NLP to structure the inbound fax / PDF / record stream feeding all downstream analytics.",
      poc: "Treat as the platform bet.", accent: C.dvSlate, fill: C.surface, rec: false },
  ];
  const n = 3, gap = 0.3, totalW = W - 2 * MX;
  const cw = (totalW - gap * (n - 1)) / n;
  const y = 2.15, ch = 4.0;
  opts.forEach((o, i) => {
    const x = MX + i * (cw + gap);
    card(s, x, y, cw, ch, { fill: o.fill, line: o.rec ? C.teal : C.border, shadow: true });
    if (o.rec) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.28, y: y + 0.26, w: cw - 0.56, h: 0.36, rectRadius: 0.06, fill: { color: C.teal }, line: { type: "none" } });
      s.addText(o.tag, { x: x + 0.28, y: y + 0.26, w: cw - 0.56, h: 0.36, margin: 0, fontFace: FONT, fontSize: 10, bold: true, color: "ffffff", charSpacing: 1, align: "center", valign: "middle" });
    } else {
      s.addText(o.tag, { x: x + 0.3, y: y + 0.28, w: cw - 0.6, h: 0.35, margin: 0, fontFace: FONT, fontSize: 11, bold: true, color: o.accent, charSpacing: 1, valign: "middle" });
    }
    s.addText(o.head, { x: x + 0.3, y: y + 0.72, w: cw - 0.6, h: 0.8, margin: 0, fontFace: FONT, fontSize: 16.5, bold: true, color: C.textStrong, valign: "top", lineSpacingMultiple: 1.0 });
    s.addText(o.risk, { x: x + 0.3, y: y + 1.52, w: cw - 0.6, h: 0.3, margin: 0, fontFace: FONT, fontSize: 10.5, bold: true, italic: true, color: o.accent, valign: "middle" });
    s.addText(o.body, { x: x + 0.3, y: y + 1.9, w: cw - 0.6, h: 1.55, margin: 0, fontFace: FONT, fontSize: 12, color: C.body, valign: "top", lineSpacingMultiple: 1.12 });
    s.addText(o.poc, { x: x + 0.3, y: y + ch - 0.6, w: cw - 0.6, h: 0.45, margin: 0, fontFace: FONT, fontSize: 11, bold: true, italic: true, color: o.accent, valign: "top" });
  });

  s.addText([
    { text: "Recommendation:  ", options: { bold: true, color: C.tealDeep } },
    { text: "start at Option A (fast, auditable, defensible), layer B where human review exists, treat C as the platform bet. Governance — de-identification, provenance, eval harness, human-in-the-loop — is a horizontal requirement across all three.", options: { color: C.body } },
  ], {
    x: MX, y: 6.4, w: totalW, h: 0.6, margin: 0,
    fontFace: FONT, fontSize: 12.5, align: "left", valign: "middle", lineSpacingMultiple: 1.1,
  });
})();

// =====================================================================
// SLIDE 8 — POC INTRO / PIPELINE
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "Proof of concept · VisitPrep Health Journal");
  title(s, "The clinical-NLP value chain, end to end");
  divider(s);
  footer(s, SN);

  s.addText("A local Next.js / TypeScript app: a patient on GLP-1 / weight-loss injections logs daily side-effect notes and wearable-style metrics; VisitPrep prepares a source-grounded pre-visit summary for the clinician.", {
    x: MX, y: 1.85, w: W - 2 * MX, h: 0.7, margin: 0,
    fontFace: FONT, fontSize: 13.5, color: C.body, valign: "top", lineSpacingMultiple: 1.15,
  });

  // Pipeline diagram: 4 boxes + arrows
  const steps = [
    { t: "Unstructured\npatient note", d: "Free-text daily journal + wearable metrics", fill: C.surface, tc: C.textStrong },
    { t: "Structured\nsymptom signals", d: "Concepts, assertion, severity, evidence spans", fill: C.surface, tc: C.textStrong },
    { t: "Trend\nanalytics", d: "Frequency, category mix, injection-adjacent trends", fill: C.surface, tc: C.textStrong },
    { t: "Doctor-ready\nsummary", d: "Source-grounded, hedged, with safety disclaimer", fill: C.teal, tc: "ffffff" },
  ];
  const n = 4, gap = 0.55, totalW = W - 2 * MX;
  const bw = (totalW - gap * (n - 1)) / n;
  const y = 3.05, bh = 2.1;
  steps.forEach((st, i) => {
    const x = MX + i * (bw + gap);
    card(s, x, y, bw, bh, { fill: st.fill, line: st.fill === C.teal ? C.teal : C.border, shadow: true });
    s.addText(String(i + 1), { x: x + 0.2, y: y + 0.2, w: 0.5, h: 0.4, margin: 0, fontFace: FONT, fontSize: 13, bold: true, color: st.fill === C.teal ? "cde9e4" : C.teal, valign: "middle" });
    s.addText(st.t, { x: x + 0.2, y: y + 0.62, w: bw - 0.4, h: 0.85, margin: 0, fontFace: FONT, fontSize: 16.5, bold: true, color: st.tc, valign: "top", lineSpacingMultiple: 1.0 });
    s.addText(st.d, { x: x + 0.2, y: y + 1.42, w: bw - 0.4, h: 0.6, margin: 0, fontFace: FONT, fontSize: 10.5, color: st.fill === C.teal ? "e0f2ee" : C.muted, valign: "top", lineSpacingMultiple: 1.08 });
    if (i < n - 1) {
      s.addText("→", { x: x + bw + 0.02, y: y + bh / 2 - 0.3, w: gap - 0.04, h: 0.6, margin: 0, fontFace: FONT, fontSize: 26, bold: true, color: C.teal, align: "center", valign: "middle" });
    }
  });

  // caption band
  card(s, MX, 5.7, totalW, 1.05, { fill: C.canvas, line: C.border });
  s.addText([
    { text: "Auditable by design.  ", options: { bold: true, color: C.tealDeep } },
    { text: "NLP extraction stays separate from presentation; every signal maps back to the exact source text. Reports are built from computed data — never from live UI state.", options: { color: C.body } },
  ], { x: MX + 0.3, y: 5.82, w: totalW - 0.6, h: 0.8, margin: 0, fontFace: FONT, fontSize: 12.5, valign: "middle", lineSpacingMultiple: 1.12 });
})();

// =====================================================================
// SLIDE 9 — POC ARCHITECTURE (4 layers)
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "POC architecture");
  title(s, "Four layers — auditable NLP separated from presentation");
  divider(s);
  footer(s, SN);

  const layers = [
    { n: "1", t: "Data layer", d: "Typed JournalEntry + WearableMetrics; mock / synthetic JSON (no PHI). Wearable data kept separate from journal text.", tag: "typed · synthetic · no PHI" },
    { n: "2", t: "NLP extraction layer  ·  src/lib/nlp/", d: "Deterministic, rule-based, auditable: 14 symptoms / 7 categories; assertion (present · absent · uncertain · resolved); severity; temporal + injection context; evidence span + confidence on every signal.", tag: "extractionMethod: \"rule-based\" — interface allows semantic-local / hybrid later" },
    { n: "3", t: "Analytics layer  ·  src/lib/analytics/", d: "Symptom frequency, top symptoms, category mix, severity distribution, injection-adjacent analysis, wearable trends (weight, sleep, steps, RHR, activity).", tag: "deterministic analytics" },
    { n: "4", t: "Report layer  ·  src/lib/report/", d: "Deterministic template summary: snapshot, medication context, symptom & wearable highlights, evidence notes with source text, discussion prompts, safety disclaimer.", tag: "built from computed data, never live UI state" },
  ];
  const totalW = W - 2 * MX;
  const y0 = 2.1, rh = 1.02, gap = 0.14;
  layers.forEach((l, i) => {
    const y = y0 + i * (rh + gap);
    const isNlp = i === 1;
    card(s, MX, y, totalW, rh, { fill: isNlp ? C.teal50 : C.surface, line: isNlp ? C.teal : C.border, shadow: true });
    // number chip
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX + 0.22, y: y + 0.24, w: 0.55, h: 0.55, rectRadius: 0.08, fill: { color: isNlp ? C.teal : C.tealDeep }, line: { type: "none" } });
    s.addText(l.n, { x: MX + 0.22, y: y + 0.24, w: 0.55, h: 0.55, margin: 0, fontFace: FONT, fontSize: 20, bold: true, color: "ffffff", align: "center", valign: "middle" });
    s.addText(l.t, { x: MX + 1.0, y: y + 0.13, w: 5.2, h: 0.4, margin: 0, fontFace: FONT, fontSize: 15, bold: true, color: isNlp ? C.tealDeep : C.textStrong, valign: "top" });
    s.addText(l.tag, { x: MX + 1.0, y: y + 0.55, w: 5.2, h: 0.4, margin: 0, fontFace: FONT, fontSize: 9.5, italic: true, color: isNlp ? C.teal : C.muted, valign: "top", lineSpacingMultiple: 1.0 });
    s.addText(l.d, { x: MX + 6.4, y: y + 0.14, w: totalW - 6.6, h: 0.78, margin: 0, fontFace: FONT, fontSize: 11.5, color: C.body, valign: "middle", lineSpacingMultiple: 1.08 });
  });

  s.addText([
    { text: "Hybrid-ready, provenance-first.  ", options: { bold: true, color: C.tealDeep } },
    { text: "Neural methods can be layered in behind the same interfaces without losing the audit trail.", options: { color: C.body } },
  ], { x: MX, y: 6.75, w: totalW, h: 0.45, margin: 0, fontFace: FONT, fontSize: 12.5, valign: "middle" });
})();

// =====================================================================
// SLIDE 10 — POC IN ACTION (extraction example)
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "POC in action");
  title(s, "One note → structured, source-grounded signal");
  divider(s);
  footer(s, SN);

  const totalW = W - 2 * MX;
  // Left: the note
  const lw = 5.6;
  card(s, MX, 2.15, lw, 4.5, { fill: C.canvas, line: C.border, shadow: true });
  s.addText("PATIENT NOTE  (input)", { x: MX + 0.3, y: 2.4, w: lw - 0.6, h: 0.35, margin: 0, fontFace: FONT, fontSize: 10.5, bold: true, color: C.muted, charSpacing: 1.5, valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: MX + 0.3, y: 2.82, w: lw - 0.6, h: 0, line: { color: C.border, width: 1 } });
  s.addText([
    { text: "“Took my injection Tuesday morning. By evening I had ", options: { color: C.body } },
    { text: "moderate nausea", options: { color: C.tealDeep, bold: true, highlight: "e9f6f3" } },
    { text: " and felt pretty wiped out. ", options: { color: C.body } },
    { text: "No vomiting", options: { color: C.tealDeep, bold: true, highlight: "e9f6f3" } },
    { text: " since breakfast, but I did ", options: { color: C.body } },
    { text: "vomit", options: { color: C.tealDeep, bold: true, highlight: "e9f6f3" } },
    { text: " after lunch.”", options: { color: C.body } },
  ], { x: MX + 0.3, y: 3.0, w: lw - 0.6, h: 2.0, margin: 0, fontFace: FONT, fontSize: 15, valign: "top", lineSpacingMultiple: 1.3 });

  s.addText([
    { text: "Clause-aware negation.  ", options: { bold: true, color: C.tealDeep } },
    { text: "“No vomiting … but I vomited after lunch” is correctly read as ", options: { color: C.body } },
    { text: "present", options: { bold: true, color: C.teal } },
    { text: " — the negation stops at “but.”", options: { color: C.body } },
  ], { x: MX + 0.3, y: 5.35, w: lw - 0.6, h: 1.1, margin: 0, fontFace: FONT, fontSize: 12, valign: "top", lineSpacingMultiple: 1.15 });

  // arrow
  s.addText("→", { x: MX + lw + 0.05, y: 4.1, w: 0.6, h: 0.6, margin: 0, fontFace: FONT, fontSize: 30, bold: true, color: C.teal, align: "center", valign: "middle" });

  // Right: extracted signal card (table-like)
  const rx = MX + lw + 0.75;
  const rw = totalW - lw - 0.75;
  card(s, rx, 2.15, rw, 4.5, { shadow: true });
  s.addText("EXTRACTED SIGNAL  (output)", { x: rx + 0.3, y: 2.4, w: rw - 0.6, h: 0.35, margin: 0, fontFace: FONT, fontSize: 10.5, bold: true, color: C.teal, charSpacing: 1.5, valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: rx + 0.3, y: 2.82, w: rw - 0.6, h: 0, line: { color: C.teal, width: 1 } });

  const rows = [
    ["Symptom", "Nausea  (category: GI)"],
    ["Assertion", "present"],
    ["Severity", "moderate  (phrase-detected)"],
    ["Temporal", "same day as injection"],
    ["Injection context", "symptom near injection day"],
    ["Evidence span", "“moderate nausea”"],
    ["Confidence", "high"],
  ];
  let yy = 3.05;
  const rh = 0.47;
  rows.forEach(([k, v], i) => {
    if (i % 2 === 1) {
      s.addShape(pres.shapes.RECTANGLE, { x: rx + 0.28, y: yy - 0.02, w: rw - 0.56, h: rh, fill: { color: C.sunken }, line: { type: "none" } });
    }
    s.addText(k, { x: rx + 0.4, y: yy, w: 2.0, h: rh, margin: 0, fontFace: FONT, fontSize: 12, color: C.muted, valign: "middle" });
    const isSpan = k === "Evidence span";
    s.addText(v, { x: rx + 2.45, y: yy, w: rw - 2.75, h: rh, margin: 0, fontFace: FONT, fontSize: 12.5, bold: isSpan || k === "Assertion", color: isSpan ? C.tealDeep : C.textStrong, valign: "middle" });
    yy += rh;
  });
})();

// =====================================================================
// SLIDE 11 — RESULTS & ENGINEERING
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++; base(s);
  eyebrow(s, "POC results & engineering");
  title(s, "Evaluation metrics & NLP hardening");
  divider(s);
  footer(s, SN);

  const totalW = W - 2 * MX;
  // Metric callouts row
  const metrics = [
    ["1.00", "Precision"],
    ["1.00", "Recall"],
    ["1.00", "F1"],
    ["0.94", "Severity acc."],
    ["1.00", "Evidence span"],
    ["0", "Negation FP"],
  ];
  const n = metrics.length, gap = 0.2;
  const mw = (totalW - gap * (n - 1)) / n;
  const my = 2.05, mh = 1.35;
  metrics.forEach(([v, l], i) => {
    const x = MX + i * (mw + gap);
    const isZero = l === "Negation FP";
    card(s, x, my, mw, mh, { fill: C.teal50, line: C.teal50, shadow: true });
    s.addText(v, { x, y: my + 0.16, w: mw, h: 0.7, margin: 0, fontFace: FONT, fontSize: 34, bold: true, color: C.teal, align: "center", valign: "middle" });
    s.addText(l, { x: x + 0.05, y: my + 0.92, w: mw - 0.1, h: 0.35, margin: 0, fontFace: FONT, fontSize: 11, color: C.body, align: "center", valign: "middle" });
  });
  s.addText("npm run nlp:evaluate  ·  150 synthetic entries / 156 signals  ·  injection-context accuracy 1.00", {
    x: MX, y: my + mh + 0.06, w: totalW, h: 0.3, margin: 0, fontFace: FONT, fontSize: 11, italic: true, color: C.muted, align: "center", valign: "middle",
  });

  // NLP hardening card (left) + caveat (right)
  const hw = 7.9, cw = totalW - hw - 0.35;
  const hy = 4.05, hh = 2.65;
  card(s, MX, hy, hw, hh, { shadow: true });
  s.addText("NLP ROBUSTNESS HARDENING", { x: MX + 0.3, y: hy + 0.22, w: hw - 0.6, h: 0.35, margin: 0, fontFace: FONT, fontSize: 12, bold: true, color: C.teal, charSpacing: 1.5, valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: MX + 0.3, y: hy + 0.62, w: hw - 0.6, h: 0, line: { color: C.border, width: 1 } });
  const harden = [
    "Fixed substring-negation bug — “no”/“not” no longer fire inside words like “normal”/“nothing” (word-boundary matching).",
    "Added negation contractions (“don’t have”, “isn’t”) that were previously missed.",
    "Made negation lookback clause-aware (stops at but / however / , / ;).",
    "Made candidate ranking assertion-aware so a present mention beats an earlier negated one.",
    "Tightened over-broad dictionary aliases that caused false positives.",
  ];
  s.addText(harden.map((t) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, breakLine: true, color: C.body, fontFace: FONT, fontSize: 11.5, paraSpaceAfter: 8, lineSpacingMultiple: 1.05 } })), {
    x: MX + 0.35, y: hy + 0.78, w: hw - 0.7, h: hh - 0.95, margin: 0, valign: "top",
  });

  // caveat card (amber)
  const cx = MX + hw + 0.35;
  card(s, cx, hy, cw, hh, { fill: C.amberTint, line: C.amberTint, shadow: true });
  s.addText("HONESTY CAVEAT", { x: cx + 0.28, y: hy + 0.22, w: cw - 0.56, h: 0.35, margin: 0, fontFace: FONT, fontSize: 12, bold: true, color: C.amber, charSpacing: 1.5, valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: cx + 0.28, y: hy + 0.62, w: cw - 0.56, h: 0, line: { color: C.amber, width: 1 } });
  s.addText("These metrics are on a curated synthetic dataset the rules were tuned against. They demonstrate correctness of the pipeline — not real-world generalization.", {
    x: cx + 0.28, y: hy + 0.78, w: cw - 0.56, h: hh - 1.0, margin: 0, fontFace: FONT, fontSize: 13, color: C.body, valign: "top", lineSpacingMultiple: 1.2,
  });
})();

// =====================================================================
// SLIDE 12 — WHY IT MATTERS / CLOSING
// =====================================================================
(function () {
  const s = pres.addSlide(); SN++;
  s.background = { color: C.tealDeep };

  s.addText("WHY IT MATTERS TO COTIVITI", {
    x: MX, y: 0.7, w: 11, h: 0.4, margin: 0,
    fontFace: FONT, fontSize: 12, bold: true, color: C.teal50, charSpacing: 3, valign: "middle",
  });
  s.addText("Hybrid, provenance-first NLP is auditable, defensible, and applicable today", {
    x: MX, y: 1.15, w: 12, h: 1.0, margin: 0,
    fontFace: FONT, fontSize: 29, bold: true, color: "ffffff", valign: "top", lineSpacingMultiple: 1.02,
  });

  // three applicability cards
  const apps = [
    ["Risk adjustment", "Surface supported / unsupported diagnosis codes with a visible source span for every finding."],
    ["Payment integrity", "Validate claims against documentation at scale; triage clinical review with auditable evidence."],
    ["Quality measurement", "Extract numerator / denominator evidence from notes that structured claims miss."],
  ];
  const n = 3, gap = 0.35, totalW = W - 2 * MX;
  const cw = (totalW - gap * (n - 1)) / n;
  const y = 2.55, ch = 1.85;
  apps.forEach(([h, b], i) => {
    const x = MX + i * (cw + gap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, rectRadius: 0.08, fill: { color: "0f5a51" }, line: { color: "156b60", width: 1 } });
    s.addText(h, { x: x + 0.28, y: y + 0.24, w: cw - 0.56, h: 0.45, margin: 0, fontFace: FONT, fontSize: 17, bold: true, color: "ffffff", valign: "top" });
    s.addText(b, { x: x + 0.28, y: y + 0.75, w: cw - 0.56, h: 1.0, margin: 0, fontFace: FONT, fontSize: 12, color: "cfe4e0", valign: "top", lineSpacingMultiple: 1.15 });
  });

  // Safety boundaries band
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX, y: 4.75, w: totalW, h: 1.55, rectRadius: 0.08, fill: { color: "093f39" }, line: { color: "156b60", width: 1 } });
  s.addText("SAFETY BOUNDARIES", { x: MX + 0.35, y: 4.95, w: totalW - 0.7, h: 0.35, margin: 0, fontFace: FONT, fontSize: 11.5, bold: true, color: "f0b96a", charSpacing: 2, valign: "middle" });
  s.addText([
    { text: "No diagnosis · no treatment or medication advice · no emergency triage.   ", options: { color: "ffffff", bold: true } },
    { text: "Hedged language (“reported”, “overlapped with”, “may be useful to discuss”). Synthetic data only. No external LLM calls in the MVP.", options: { color: "d7ece8" } },
  ], { x: MX + 0.35, y: 5.35, w: totalW - 0.7, h: 0.85, margin: 0, fontFace: FONT, fontSize: 14, valign: "top", lineSpacingMultiple: 1.2 });

  s.addText([
    { text: "Start at Option A. ", options: { bold: true, color: "ffffff" } },
    { text: "Auditable structured signals with a source span on every output — the pattern regulated healthcare needs, with neural methods layerable behind the same interfaces.", options: { color: "b9d6d1" } },
  ], { x: MX, y: 6.55, w: totalW, h: 0.6, margin: 0, fontFace: FONT, fontSize: 13, valign: "middle", lineSpacingMultiple: 1.15 });

  s.addText([
    { text: "Shubham Pareek — Columbia University   ·   ", options: { color: "9ec4bd" } },
    { text: "Cotiviti", options: { color: C.cotiviti, bold: true } },
    { text: " Intern Assessment · Topic 1", options: { color: "9ec4bd" } },
  ], { x: MX, y: 7.12, w: totalW, h: 0.3, margin: 0, fontFace: FONT, fontSize: 10, valign: "middle" });
})();

pres.writeFile({ fileName: "/Users/shubhampareek/Documents/Cotivit/deliverables/VisitPrep_Clinical_NLP_Deck.pptx" })
  .then((fn) => console.log("WROTE " + fn + " · slides=" + SN));
