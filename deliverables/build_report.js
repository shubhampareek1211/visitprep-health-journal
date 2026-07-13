const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType, HeadingLevel,
  LevelFormat, BorderStyle, PageBreak, ExternalHyperlink
} = require("docx");

const TEAL = "0E7466";
const GRAY = "353D42";
const MUTED = "6A757C";
const FONT = "Public Sans";

const img = (file, w = 600) => {
  const h = Math.round((w * 1800) / 2880);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 40 },
    children: [new ImageRun({
      type: "png",
      data: fs.readFileSync(`docs/screenshots/${file}`),
      transformation: { width: w, height: h },
      altText: { title: file, description: file, name: file }
    })]
  });
};
const caption = (t) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: t, italics: true, size: 18, color: MUTED, font: FONT })]
});
const h1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const h2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const p = (runs) => new Paragraph({
  spacing: { after: 140, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: (Array.isArray(runs) ? runs : [new TextRun({ text: runs, font: FONT, size: 22, color: GRAY })])
});
const t = (text, opts = {}) => new TextRun({ text, font: FONT, size: 22, color: GRAY, ...opts });
const bullet = (runs) => new Paragraph({
  numbering: { reference: "b", level: 0 },
  spacing: { after: 80, line: 264 },
  children: (Array.isArray(runs) ? runs : [t(runs)])
});
const num = (runs) => new Paragraph({
  numbering: { reference: "n", level: 0 },
  spacing: { after: 80, line: 264 },
  children: (Array.isArray(runs) ? runs : [t(runs)])
});
const ref = (text) => new Paragraph({
  spacing: { after: 120, line: 264 },
  indent: { left: 720, hanging: 720 },
  children: [t(text, { size: 20 })]
});

const children = [
  // ---- Title block ----
  new Paragraph({ spacing: { after: 40 }, children: [
    new TextRun({ text: "VisitPrep", bold: true, size: 40, color: TEAL, font: FONT }),
    new TextRun({ text: "  —  A Clinical Natural Language Technology Proof of Concept", bold: true, size: 32, color: "151A1D", font: FONT })
  ]}),
  new Paragraph({ spacing: { after: 20 }, children: [
    new TextRun({ text: "Past, Present & Future · NLP · OCR · Computer Vision · LLM · LMM", size: 22, color: MUTED, font: FONT })
  ]}),
  new Paragraph({ spacing: { after: 20 }, children: [
    new TextRun({ text: "Shubham Pareek — Columbia University", size: 22, color: GRAY, font: FONT })
  ]}),
  new Paragraph({
    spacing: { after: 240 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: TEAL, space: 6 } },
    children: [new TextRun({ text: "Intern Assessment — Topic 1: Clinical Natural Language Technology", size: 22, color: GRAY, font: FONT })]
  }),

  // ---- Introduction ----
  h1("1. Introduction"),
  p([t("Roughly four-fifths of the information generated in clinical care is unstructured text — physician notes, patient-reported narratives, discharge summaries, and scanned documents. "), t("Clinical Natural Language Technology"), t(" is the family of methods that turns that language into structured, computable data. For this assessment I built "), t("VisitPrep", { bold: true }), t(", a working proof of concept that demonstrates the full clinical-NLP value chain end to end and, deliberately, does so with transparent, deterministic, on-device processing rather than an opaque model.")]),
  p([t("VisitPrep converts a patient’s free-text daily health notes and wearable-style metrics into structured symptom signals, trend analytics, and a concise, source-grounded summary a clinician can review before a visit. The initial use case is a patient tracking side effects of GLP-1 / weight-loss injections. This report defines the topic, traces its past, present, and future, summarizes current trends, and then describes the project in technical depth, illustrated with the running interface.")]),
  p([t("The guiding design principle is "), t("provenance-first extraction", { bold: true }), t(": every structured signal and every sentence of the generated summary can be traced back to the exact patient phrase it came from. In a regulated domain, an auditable answer is worth more than a marginally more accurate but unexplainable one.")]),

  // ---- Five layers ----
  h1("2. Clinical NLP: the five capability layers"),
  p([t("Clinical natural language technology spans five layers that increasingly build on one another:")]),
  bullet([t("NLP", { bold: true }), t(" — parsing free text into concepts (symptoms, medications, diagnoses), assertions (present, absent, uncertain), and relations. The foundation of the field.")]),
  bullet([t("OCR", { bold: true }), t(" — converting scanned faxes, PDFs, and handwritten or printed documents into machine-readable text; still essential because much clinical exchange remains fax and image based.")]),
  bullet([t("Computer Vision", { bold: true }), t(" — extracting signal from medical images and from document layout (tables, form fields, signatures), increasingly fused with OCR into “document understanding.”")]),
  bullet([t("LLM (Large Language Models)", { bold: true }), t(" — transformer models, from BERT to GPT-4-class systems, that summarize and reason over clinical text with far less task-specific engineering than earlier methods.")]),
  bullet([t("LMM (Large Multimodal Models)", { bold: true }), t(" — models that jointly reason over text, images, and structured data (a note together with its imaging and labs). This is the current research frontier.")]),
  p([t("VisitPrep operates primarily in the first layer, but its typed interfaces are designed so the others can be layered in without rewriting the system around them.")]),

  // ---- Past present future ----
  h1("3. Past, present, and future"),
  p([t("Past (rule-based and statistical, c. 2000–2015).", { bold: true }), t(" Early clinical NLP relied on dictionary and ontology lookup against the Unified Medical Language System, in systems such as MetaMap (Aronson & Lang, 2010) and cTAKES (Savova et al., 2010), combined with hand-built rules and negation detection. Shared tasks such as the i2b2/VA challenges (Uzuner et al., 2011) standardized evaluation. These systems were transparent and auditable but brittle to unfamiliar phrasing and costly to maintain.")]),
  p([t("Present (the transformer era, c. 2018–present).", { bold: true }), t(" Contextual models — BERT (Devlin et al., 2019) and its clinical descendants BioBERT (Lee et al., 2020) and ClinicalBERT (Alsentzer et al., 2019), trained on corpora such as MIMIC-III (Johnson et al., 2016) — raised accuracy sharply, and generative models such as Med-PaLM reached passing-level medical question answering (Singhal et al., 2023). In imaging, models such as CheXNet matched clinician-level performance on specific tasks (Rajpurkar et al., 2017). The trade-off is hallucination, opacity, privacy exposure, and cost.")]),
  p([t("Future (multimodal, agentic, and governed).", { bold: true }), t(" The trajectory points toward large multimodal models reasoning jointly over notes, images, and labs; retrieval-grounded and agentic pipelines that cite their sources; and hybrid systems that wrap neural recall in deterministic guardrails for auditability. Governance — de-identification, provenance, evaluation harnesses, and human oversight — becomes a first-class requirement rather than an afterthought. VisitPrep is a small, concrete instance of that hybrid, governed pattern.")]),

  // ---- Trends ----
  h1("4. Current trends"),
  num([t("The center of value is shifting from extraction to generation — summarizing and drafting, not only tagging concepts.")]),
  num([t("OCR, computer vision, and NLP are converging into a single document-understanding stack.")]),
  num([t("Provenance and grounding are becoming a requirement rather than a feature; ungrounded generation is a liability in clinical settings.")]),
  num([t("Hybrid architectures — deterministic guardrails around neural models — tend to win in regulated environments.")]),
  num([t("Privacy-preserving and on-device deployment is becoming table stakes wherever protected health information is involved.")]),

  // ---- The project: architecture ----
  h1("5. The project — VisitPrep architecture"),
  p([t("VisitPrep is a local web application built with Next.js, React, and TypeScript, with Recharts for visualization and a purpose-built clinical design system. It performs the entire pipeline locally:")]),
  p([new TextRun({ text: "Unstructured patient note  →  structured symptom signals  →  trend analytics  →  doctor-ready summary", font: "IBM Plex Mono", size: 20, color: TEAL })]),
  p([t("The codebase is organized into four layers, with the auditable extraction logic kept entirely separate from presentation:")]),
  bullet([t("Data layer", { bold: true }), t(" (src/types, src/lib/syntheticDataset.ts): explicit TypeScript models — JournalEntry, WearableMetrics, ExtractedClinicalSignal, PatientAnalyticsSummary, and DoctorReport. The demo runs on a synthetic dataset of five patients over thirty days (150 entries); wearable telemetry is kept separate from journal text, and the dataset shape is asserted at load time.")]),
  bullet([t("NLP extraction layer", { bold: true }), t(" (src/lib/nlp): deterministic, rule-based, and fully auditable (Section 6).")]),
  bullet([t("Analytics layer", { bold: true }), t(" (src/lib/analytics): derives frequencies, distributions, and trends from the extracted signals (Section 7).")]),
  bullet([t("Report layer", { bold: true }), t(" (src/lib/report): assembles the doctor-ready summary from computed data — never from live UI state — so an exported report is reproducible (Section 7).")]),
  p([t("The interface presents this as a clinician-style workspace. Figure 1 shows the Overview: the patient captures a note, the system extracts symptom signals locally, and key metrics, discussion prompts, and a persistent safety boundary frame the screen.")]),
  img("overview.png"),
  caption("Figure 1. Overview — journal capture with local, deterministic signal extraction, KPI cards, and a persistent safety boundary."),

  // ---- NLP pipeline ----
  h1("6. Inside the NLP extraction pipeline"),
  p([t("Extraction is deterministic and runs per journal entry. Each step is designed so that its output can be traced to the source text.")]),
  num([t("Sentence spanning.", { bold: true }), t(" The note is split into sentence spans that retain absolute character offsets, so every downstream match points to exact source characters.")]),
  num([t("Dictionary matching.", { bold: true }), t(" A symptom dictionary of 14 symptoms across 7 categories (gastrointestinal, energy, mood, cardiovascular, sleep, appetite, and other) is matched using weighted aliases (for example, “nauseous,” “queasy,” “sick to my stomach” for nausea). Matching is word-boundary aware and tolerant of irregular whitespace in multi-word aliases.")]),
  num([t("Assertion detection.", { bold: true }), t(" Each mention is classified as present, absent, uncertain, or resolved, using a negation-cue lookback, hedging cues (“maybe,” “might be,” “felt like”), and resolution cues (“went away,” “no longer”). Crucially, the negation lookback is clause-aware: its scope stops at clause boundaries such as “but,” “however,” commas, and semicolons, so “No vomiting since breakfast, but I vomited after lunch” correctly resolves to a present mention.")]),
  num([t("Severity detection.", { bold: true }), t(" Severity (mild, moderate, severe) is read from phrases in the evidence sentence, with graceful fallbacks to nearby context and then to the patient’s daily self-rated severity.")]),
  num([t("Temporal and injection context.", { bold: true }), t(" Temporal tags (morning, overnight, post-injection) are attached, and injection relatedness is inferred from entry flags (injection or dose-change day) or in-sentence phrasing, approximating a symptom occurring within about 48 hours of an injection.")]),
  num([t("Evidence span and confidence.", { bold: true }), t(" Every signal carries its evidence sentence, character offsets, matched text, a human-readable severity reason, and a confidence score derived from the alias weight and adjusted by assertion status, severity, and injection context (clamped between 0.20 and 0.99).")]),
  num([t("Deduplication and ranking.", { bold: true }), t(" The best candidate per symptom is chosen by assertion status (present outranks uncertain, resolved, then absent), then alias weight, then match length and position, so a genuine present mention is never displaced by an earlier negated one.")]),
  p([t("As part of building the pipeline I hardened the negation logic: I fixed substring false positives (so “no” no longer fires inside “normal”), added negation contractions (“don’t have,” “isn’t”), made the lookback clause-aware, made ranking assertion-aware, and tightened over-broad aliases. Figure 2 shows how the extracted signals appear per note in the Journal timeline, color-coded by severity and annotated with injection-day and severity markers.")]),
  img("journal.png"),
  caption("Figure 2. Journal — a per-note timeline showing the symptom signals extracted from each note, color-coded by severity."),

  // ---- Analytics and report ----
  h1("7. Analytics and the doctor-ready report"),
  p([t("The analytics layer aggregates the extracted signals into symptom and category frequencies, a top-symptom ranking, an injection-adjacent symptom breakdown, and a severity distribution. For each wearable metric it computes first-versus-last values and a week-one versus week-four average change — weight, sleep, steps, resting heart rate, active minutes, and strength-training minutes. Figure 3 shows these rendered as clinical, restrained charts.")]),
  img("analytics.png"),
  caption("Figure 3. Analytics — symptom frequency, weight trend, sleep and resting heart rate, activity, and a symptom-severity timeline."),
  p([t("The report layer assembles a deterministic, doctor-ready summary: a 30-day snapshot, GLP-1 medication context (including which symptoms occurred in injection-adjacent windows), symptom and wearable highlights, and discussion prompts. The evidence it surfaces is chosen by a transparent, extractive selection algorithm: each entry is scored (roughly, signals × 2, plus moderate signals × 3, plus bonuses for injection and dose-change days), and the algorithm greedily selects entries that introduce a new symptom for diversity, capping the set. Each selected note is shown verbatim with the matched phrase highlighted, and a safety disclaimer is always included. Figure 4 shows the result.")]),
  img("doctor-report.png"),
  caption("Figure 4. Doctor Report — a source-grounded summary; every claim traces to a note, with the matched phrase highlighted."),

  // ---- Evaluation ----
  h1("8. Evaluation and results"),
  p([t("Extraction quality is measured by a deterministic evaluation harness (npm run nlp:evaluate) that scores the pipeline against annotated synthetic data (150 entries, 156 signals). On that set the system achieves precision 1.00, recall 1.00, and F1 1.00, with severity accuracy 0.94, evidence-span coverage 1.00 (every signal’s reported span maps back to the exact source text), zero negation false positives, and injection-context accuracy 1.00.")]),
  p([t("An honest caveat: ", { bold: true }), t("these figures are computed on a curated synthetic dataset that the rules were tuned against. They demonstrate that the pipeline is internally correct and that its provenance guarantees hold; they do not establish generalization to real-world clinical charts, which would require de-identified clinical data and blind evaluation.")]),

  // ---- Safety ----
  h1("9. Safety, limitations, and future work"),
  p([t("VisitPrep organizes, summarizes, and visualizes patient-reported data. It does not diagnose, determine causality, recommend treatment or medication changes, or perform emergency triage. Its generated language is deliberately hedged — “reported,” “overlapped with,” “may be useful to discuss” — never “caused by” or “diagnosed as.” All data is synthetic, and there are no external model or API calls.")]),
  p([t("The main limitation is coverage: a rule-based dictionary handles the symptoms it knows and phrasing near what it expects. The roadmap addresses this while preserving the audit trail: local sentence embeddings with clustering and maximal-marginal-relevance selection for semantic evidence; hybrid neural recall behind the same typed interfaces (the extraction-method field already anticipates this); and OCR intake so scanned notes can enter the same pipeline. In each case the principle is unchanged — neural methods may improve recall, but every surfaced result must remain traceable to its source.")]),
  p([t("As a proof of concept, VisitPrep shows that a deterministic, provenance-first system can deliver the full clinical-NLP value chain — capture, extraction, analytics, and a doctor-ready summary — in a form that is auditable end to end, which is exactly the property that the next generation of clinical language technology will have to earn.")]),

  // ---- References ----
  new Paragraph({ children: [new PageBreak()] }),
  h1("References"),
  ref("Alsentzer, E., Murphy, J. R., Boag, W., Weng, W.-H., Jin, D., Naumann, T., & McDermott, M. B. A. (2019). Publicly available clinical BERT embeddings. Proceedings of the 2nd Clinical NLP Workshop (NAACL 2019), 72–78."),
  ref("Aronson, A. R., & Lang, F. M. (2010). An overview of MetaMap: Historical perspective and recent advances. Journal of the American Medical Informatics Association, 17(3), 229–236."),
  ref("Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K. (2019). BERT: Pre-training of deep bidirectional transformers for language understanding. Proceedings of NAACL-HLT 2019, 4171–4186."),
  ref("Johnson, A. E. W., Pollard, T. J., Shen, L., Lehman, L. H., Feng, M., Ghassemi, M., … Mark, R. G. (2016). MIMIC-III, a freely accessible critical care database. Scientific Data, 3, 160035."),
  ref("Lee, J., Yoon, W., Kim, S., Kim, D., Kim, S., So, C. H., & Kang, J. (2020). BioBERT: A pre-trained biomedical language representation model for biomedical text mining. Bioinformatics, 36(4), 1234–1240."),
  ref("Office of the National Coordinator for Health Information Technology. (2020). 21st Century Cures Act: Interoperability, information blocking, and the ONC health IT certification program (Final Rule). U.S. Department of Health and Human Services."),
  ref("Rajpurkar, P., Irvin, J., Zhu, K., Yang, B., Mehta, H., Duan, T., … Ng, A. Y. (2017). CheXNet: Radiologist-level pneumonia detection on chest X-rays with deep learning. arXiv:1711.05225."),
  ref("Savova, G. K., Masanz, J. J., Ogren, P. V., Zheng, J., Sohn, S., Kipper-Schuler, K. C., & Chute, C. G. (2010). Mayo clinical Text Analysis and Knowledge Extraction System (cTAKES): Architecture, component evaluation and applications. Journal of the American Medical Informatics Association, 17(5), 507–513."),
  ref("Singhal, K., Azizi, S., Tu, T., Mahdavi, S. S., Wei, J., Chung, H. W., … Natarajan, V. (2023). Large language models encode clinical knowledge. Nature, 620, 172–180."),
  ref("U.S. Department of Health and Human Services. (2012). Guidance regarding methods for de-identification of protected health information in accordance with the HIPAA Privacy Rule."),
  ref("Uzuner, Ö., South, B. R., Shen, S., & DuVall, S. L. (2011). 2010 i2b2/VA challenge on concepts, assertions, and relations in clinical text. Journal of the American Medical Informatics Association, 18(5), 552–556.")
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: 22, color: GRAY } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: FONT, color: TEAL },
        paragraph: { spacing: { before: 260, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 23, bold: true, font: FONT, color: "151A1D" },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 1 } }
    ]
  },
  numbering: {
    config: [
      { reference: "b", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 520, hanging: 260 } } } }] },
      { reference: "n", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 520, hanging: 260 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children
  }]
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("deliverables/VisitPrep_Clinical_NLP_Report.docx", buf);
  console.log("wrote deliverables/VisitPrep_Clinical_NLP_Report.docx", buf.length, "bytes");
});
