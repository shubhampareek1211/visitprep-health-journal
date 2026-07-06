/* Synthetic data for the VisitPrep Health Journal workspace UI kit.
   Synthetic data only — no real patients. Exposed as window.VP_DATA. */
(function () {
  // Deterministic pseudo-series helper
  function series(start, step, n, jitterSeed) {
    let s = jitterSeed || 1;
    const out = [];
    let v = start;
    for (let i = 0; i < n; i++) {
      s = (s * 9301 + 49297) % 233280;
      const j = (s / 233280 - 0.5);
      v = v + step + j * Math.abs(step) * 1.4;
      out.push(Math.round(v * 10) / 10);
    }
    return out;
  }

  const SEV = { none: 0, mild: 1, moderate: 2, severe: 3 };

  // ── Patient A: Maria S. ──────────────────────────────────────────────
  const maria = {
    id: "PT-0413",
    name: "Maria S.",
    initials: "MS",
    age: 47,
    sex: "F",
    med: "Semaglutide (GLP-1)",
    dose: "1.0 mg weekly",
    reviewWindow: "May 14 – Jun 12, 2026",
    reviewDays: 30,
    injectionDays: 4,
    doseChanges: 1,
    doseChangeNote: "0.5 → 1.0 mg on May 28",
    weightStart: 214.0,
    weightEnd: 210.6,
    moderateDays: 6,
    topSymptoms: ["nausea", "low appetite", "fatigue"],
    notes: [
      { date: "2026-06-12", day: "Fri", injection: false, dose: null,
        text: "Felt nauseous this morning, ate very little. Tired by mid-afternoon but slept a bit better.",
        symptoms: [
          { label: "nausea", level: "moderate", match: "nauseous", inj: false },
          { label: "low appetite", level: "moderate", match: "ate very little", inj: false },
          { label: "fatigue", level: "mild", match: "Tired", inj: false },
        ] },
      { date: "2026-06-10", day: "Wed", injection: true, dose: null,
        text: "Injection day. Some bloating and mild dizziness an hour after. Appetite low all day.",
        symptoms: [
          { label: "bloating", level: "mild", match: "bloating", inj: true },
          { label: "dizziness", level: "mild", match: "dizziness", inj: true },
          { label: "low appetite", level: "moderate", match: "Appetite low", inj: true },
        ] },
      { date: "2026-06-08", day: "Mon", injection: false, dose: null,
        text: "Better day. Light nausea after lunch but went on a short walk. Sleep was okay.",
        symptoms: [
          { label: "nausea", level: "mild", match: "nausea", inj: false },
        ] },
      { date: "2026-06-05", day: "Fri", injection: false, dose: null,
        text: "Constipation continues. No appetite for dinner. Felt a little dizzy standing up.",
        symptoms: [
          { label: "constipation", level: "moderate", match: "Constipation", inj: false },
          { label: "low appetite", level: "moderate", match: "No appetite", inj: false },
          { label: "dizziness", level: "mild", match: "dizzy", inj: false },
        ] },
      { date: "2026-06-03", day: "Wed", injection: true, dose: null,
        text: "Injection day. Strong nausea in the evening, threw up once. Very tired afterward.",
        symptoms: [
          { label: "nausea", level: "severe", match: "Strong nausea", inj: true },
          { label: "vomiting", level: "severe", match: "threw up", inj: true },
          { label: "fatigue", level: "moderate", match: "Very tired", inj: true },
        ] },
    ],
    symptomFreq: [
      { label: "nausea", value: 6, color: "var(--viz-amber)" },
      { label: "low appetite", value: 5 },
      { label: "fatigue", value: 4 },
      { label: "constipation", value: 3 },
      { label: "poor sleep", value: 3 },
      { label: "bloating", value: 2 },
      { label: "dizziness", value: 2 },
      { label: "vomiting", value: 1, color: "var(--viz-clay)" },
    ],
    wearables: {
      weight: series(214, -0.55, 30, 7),
      sleep: series(6.4, 0.03, 30, 3).map(v => Math.max(5, Math.min(8.5, v))),
      rhr: series(67, -0.16, 30, 11).map(v => Math.round(v)),
      steps: series(4200, 70, 30, 5).map(v => Math.max(1500, Math.round(v / 100) * 100)),
      activeMin: series(22, 0.7, 30, 9).map(v => Math.max(5, Math.round(v))),
    },
  };

  // 30-day symptom-severity grid (max symptom severity that day)
  maria.timeline = [3,0,0,1,0,2,0,0,1,2,0,0,2,0,1,0,0,2,1,0,3,0,1,0,2,0,1,2,0,2];
  maria.injectionMarks = [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1];

  // ── Patient B: James T. ──────────────────────────────────────────────
  const james = {
    id: "PT-0728",
    name: "James T.",
    initials: "JT",
    age: 53,
    sex: "M",
    med: "Tirzepatide (GLP-1)",
    dose: "5.0 mg weekly",
    reviewWindow: "May 14 – Jun 12, 2026",
    reviewDays: 30,
    injectionDays: 4,
    doseChanges: 0,
    doseChangeNote: "No change this window",
    weightStart: 248.2,
    weightEnd: 243.1,
    moderateDays: 3,
    topSymptoms: ["fatigue", "constipation", "poor sleep"],
    notes: [
      { date: "2026-06-11", day: "Thu", injection: false, dose: null,
        text: "Tired in the afternoon again. Constipation still there. Appetite normal otherwise.",
        symptoms: [
          { label: "fatigue", level: "moderate", match: "Tired", inj: false },
          { label: "constipation", level: "moderate", match: "Constipation", inj: false },
        ] },
      { date: "2026-06-09", day: "Tue", injection: true, dose: null,
        text: "Injection day. Mild nausea for an hour, nothing major. Slept poorly though.",
        symptoms: [
          { label: "nausea", level: "mild", match: "Mild nausea", inj: true },
          { label: "poor sleep", level: "moderate", match: "Slept poorly", inj: true },
        ] },
      { date: "2026-06-06", day: "Sat", injection: false, dose: null,
        text: "Good energy today, long walk. Slight bloating after dinner.",
        symptoms: [
          { label: "bloating", level: "mild", match: "bloating", inj: false },
        ] },
    ],
    symptomFreq: [
      { label: "fatigue", value: 5 },
      { label: "constipation", value: 4 },
      { label: "poor sleep", value: 3 },
      { label: "nausea", value: 2 },
      { label: "bloating", value: 2 },
      { label: "low appetite", value: 1 },
    ],
    wearables: {
      weight: series(248, -0.7, 30, 4),
      sleep: series(6.0, 0.02, 30, 6).map(v => Math.max(4.8, Math.min(8, v))),
      rhr: series(71, -0.12, 30, 8).map(v => Math.round(v)),
      steps: series(5600, 90, 30, 2).map(v => Math.max(2000, Math.round(v / 100) * 100)),
      activeMin: series(28, 0.9, 30, 3).map(v => Math.max(8, Math.round(v))),
    },
  };
  james.timeline = [0,1,0,0,2,0,1,0,2,1,0,0,1,0,2,0,1,0,0,1,0,2,0,1,0,1,0,2,0,1];
  james.injectionMarks = [0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0];

  window.VP_DATA = { patients: [maria, james], SEV };
})();
