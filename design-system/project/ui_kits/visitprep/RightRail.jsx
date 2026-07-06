/* RightRail — desktop-only context rail: readiness, prompts, safety, evidence. */
function RightRail({ p }) {
  const { Badge, SafetyNote } = window.VisitPrepDesignSystem_2c5c4e;
  React.useEffect(() => { window.lucide && lucide.createIcons(); });

  const checks = [
    { label: "Review window set", done: true },
    { label: "Journal notes recorded", done: true, meta: p.notes.length + " notes" },
    { label: "Signals extracted", done: true },
    { label: "Wearable metrics synced", done: true },
    { label: "Clinician review", done: false, meta: "pending" },
  ];
  const done = checks.filter((c) => c.done).length;
  const pct = Math.round((done / checks.length) * 100);

  const Panel = ({ eyebrow, icon, children }) => (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
        <i data-lucide={icon} style={{ width: 15, height: 15, color: "var(--text-muted)" }}></i>
        <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-muted)", fontWeight: 600 }}>{eyebrow}</span>
      </div>
      {children}
    </div>
  );

  return (
    <aside style={{ width: "var(--rail-width)", flex: "none", display: "flex", flexDirection: "column", gap: 14 }}>
      <Panel eyebrow="Report readiness" icon="circle-check">
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 26, fontWeight: 700, color: "var(--text-strong)", fontVariantNumeric: "tabular-nums" }}>{pct}%</span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{done} of {checks.length} steps</span>
        </div>
        <div style={{ height: 6, background: "var(--surface-sunken)", borderRadius: "var(--radius-pill)", overflow: "hidden", marginBottom: 12 }}>
          <div style={{ width: pct + "%", height: "100%", background: "var(--accent)", borderRadius: "var(--radius-pill)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {checks.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "var(--text-sm)" }}>
              <i data-lucide={c.done ? "check-circle-2" : "circle-dashed"} style={{ width: 15, height: 15, color: c.done ? "var(--accent)" : "var(--text-subtle)", flex: "none" }}></i>
              <span style={{ color: c.done ? "var(--text-body)" : "var(--text-muted)" }}>{c.label}</span>
              {c.meta && <span style={{ marginLeft: "auto", fontSize: "var(--text-2xs)", color: "var(--text-subtle)" }}>{c.meta}</span>}
            </div>
          ))}
        </div>
      </Panel>

      <Panel eyebrow="Key discussion prompts" icon="messages-square">
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
          {[
            "Nausea clustered within 48 h of injection.",
            "Low appetite persisted across the window.",
            p.doseChanges > 0 ? "Symptoms rose after the dose increase." : "Symptoms stable; no dose change.",
          ].map((t, i) => (
            <li key={i} style={{ display: "flex", gap: 8, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.4 }}>
              <i data-lucide="dot" style={{ width: 16, height: 16, color: "var(--accent)", flex: "none" }}></i>{t}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel eyebrow="Source evidence summary" icon="search-check">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {p.symptomFreq.slice(0, 4).map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "var(--text-sm)" }}>
              <span style={{ textTransform: "capitalize", color: "var(--text-body)", fontWeight: 500 }}>{s.label}</span>
              <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{s.value} note{s.value > 1 ? "s" : ""}</span>
            </div>
          ))}
          <div style={{ marginTop: 4, paddingTop: 10, borderTop: "1px solid var(--border-subtle)", fontSize: "var(--text-2xs)", color: "var(--text-subtle)" }}>
            Every signal links to a verbatim note. Local deterministic extraction.
          </div>
        </div>
      </Panel>

      <SafetyNote title="Safety boundary">
        No diagnosis or treatment advice. This summary organizes synthetic, patient-reported notes for clinician discussion.
      </SafetyNote>
    </aside>
  );
}
window.RightRail = RightRail;
