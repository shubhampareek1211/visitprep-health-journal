/* Shared pieces: PatientHeader, SectionLabel, NoteRow, and the local
   deterministic symptom extractor used by the journal input. */

function SectionLabel({ children, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
      {icon && <i data-lucide={icon} style={{ width: 15, height: 15, color: "var(--text-muted)" }}></i>}
      <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-muted)", fontWeight: 600 }}>{children}</span>
    </div>
  );
}
window.SectionLabel = SectionLabel;

function PatientHeader({ p }) {
  const { Badge } = window.VisitPrepDesignSystem_2c5c4e;
  const wDelta = (p.weightEnd - p.weightStart).toFixed(1);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
      background: "var(--surface)", border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xs)",
    }}>
      <span style={{
        width: 52, height: 52, borderRadius: "var(--radius-lg)", flex: "none",
        background: "var(--accent-tint)", color: "var(--accent-text)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 700,
      }}>{p.initials}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h1 style={{ fontSize: "var(--text-h1)", fontWeight: 700, color: "var(--text-strong)" }}>{p.name}</h1>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-muted)", background: "var(--surface-sunken)", padding: "2px 7px", borderRadius: "var(--radius-sm)" }}>{p.id}</span>
        </div>
        <div style={{ marginTop: 4, fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          {p.age} · {p.sex} · {p.med} · {p.dose}
        </div>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
        <Badge tone="accent" icon="syringe">{p.injectionDays} injection days</Badge>
        {p.doseChanges > 0
          ? <Badge tone="caution" icon="arrow-up-right">{p.doseChangeNote}</Badge>
          : <Badge tone="neutral">No dose change</Badge>}
      </div>
    </div>
  );
}
window.PatientHeader = PatientHeader;

function NoteRow({ note, last }) {
  const { SymptomChip, Badge } = window.VisitPrepDesignSystem_2c5c4e;
  return (
    <div style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: last ? "none" : "1px solid var(--border-subtle)" }}>
      <div style={{ width: 52, flex: "none", textAlign: "center" }}>
        <div style={{ fontSize: "var(--text-2xs)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{note.day}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)" }}>{note.date.slice(5)}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          {note.injection && <Badge tone="accent" icon="syringe">Injection day</Badge>}
          {note.symptoms.some(s => s.level === "severe") && <Badge tone="danger">Severe reported</Badge>}
        </div>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: "var(--leading-snug)", marginBottom: 9 }}>{note.text}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {note.symptoms.map((s, i) => (
            <SymptomChip key={i} label={s.label} level={s.level} injectionAdjacent={s.inj} />
          ))}
        </div>
      </div>
    </div>
  );
}
window.NoteRow = NoteRow;

/* Local deterministic extractor — keyword/phrase match, no model inference. */
const VP_LEXICON = [
  { label: "nausea", level: "moderate", terms: ["nauseous", "nausea", "queasy"] },
  { label: "vomiting", level: "severe", terms: ["threw up", "vomit", "vomited", "throwing up"] },
  { label: "fatigue", level: "mild", terms: ["tired", "fatigue", "exhausted", "no energy"] },
  { label: "low appetite", level: "moderate", terms: ["no appetite", "ate very little", "appetite low", "low appetite", "not hungry"] },
  { label: "constipation", level: "moderate", terms: ["constipation", "constipated"] },
  { label: "diarrhea", level: "moderate", terms: ["diarrhea", "loose stool"] },
  { label: "bloating", level: "mild", terms: ["bloating", "bloated"] },
  { label: "dizziness", level: "mild", terms: ["dizzy", "dizziness", "lightheaded"] },
  { label: "poor sleep", level: "mild", terms: ["slept poorly", "poor sleep", "couldn't sleep", "trouble sleeping"] },
];
function vpExtract(text, isInjection) {
  const low = (text || "").toLowerCase();
  const found = [];
  for (const entry of VP_LEXICON) {
    for (const term of entry.terms) {
      const i = low.indexOf(term);
      if (i >= 0) {
        found.push({ label: entry.label, level: entry.level, match: text.slice(i, i + term.length), inj: isInjection });
        break;
      }
    }
  }
  return found;
}
window.vpExtract = vpExtract;
