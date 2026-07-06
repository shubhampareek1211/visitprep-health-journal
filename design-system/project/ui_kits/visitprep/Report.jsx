/* Doctor Report screen — the doctor-ready visit summary. */
function Report({ p }) {
  const { Card, Badge, EvidenceCard, SafetyNote, Button } = window.VisitPrepDesignSystem_2c5c4e;
  const { SectionLabel } = window;
  React.useEffect(() => { window.lucide && lucide.createIcons(); });

  const wDelta = (p.weightEnd - p.weightStart).toFixed(1);
  const prompts = [
    "Nausea clustered within 48 h of injection on " + p.symptomFreq[0].value + " of 30 days — is the titration pace appropriate?",
    "Low appetite persisted across the window; review nutrition and hydration.",
    p.doseChanges > 0 ? "Symptom intensity rose after the 0.5 → 1.0 mg increase on May 28." : "Symptoms stable; no dose change this window.",
    "Resting heart rate trended down " + (p.wearables.rhr[0] - p.wearables.rhr[p.wearables.rhr.length - 1]) + " bpm — confirm expected.",
  ];
  const highlights = [
    { icon: "weight", label: "Weight", value: wDelta + " lb", note: p.weightStart + " → " + p.weightEnd + " lb over 30 days" },
    { icon: "moon", label: "Sleep", value: "≈ " + (p.wearables.sleep.reduce((a, b) => a + b, 0) / p.wearables.sleep.length).toFixed(1) + " h", note: "avg nightly, slightly improving" },
    { icon: "heart-pulse", label: "Resting HR", value: p.wearables.rhr[p.wearables.rhr.length - 1] + " bpm", note: "down from " + p.wearables.rhr[0] + " bpm" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
      {/* Report header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 14, padding: "18px 20px",
        background: "var(--surface)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)",
      }}>
        <span style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "var(--accent-tint)", color: "var(--accent-text)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <i data-lucide="file-text" style={{ width: 22, height: 22 }}></i>
        </span>
        <div>
          <h1 style={{ fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--text-strong)" }}>Doctor-ready visit summary</h1>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 2 }}>{p.name} · <span style={{ fontFamily: "var(--font-mono)" }}>{p.id}</span> · {p.reviewWindow}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Button variant="secondary" size="md" icon="printer">Print</Button>
          <Button variant="primary" size="md" icon="file-down">Export PDF</Button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card eyebrow="30-day snapshot" title="At a glance">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              ["Top symptom", p.topSymptoms[0], p.symptomFreq[0].value + " of 30 days"],
              ["Injection days", p.injectionDays, "in window"],
              ["Weight change", wDelta + " lb", "30 days"],
              ["Moderate+ days", p.moderateDays + " / 30", "patient-reported"],
            ].map((row, i) => (
              <div key={i} style={{ padding: "10px 12px", background: "var(--surface-sunken)", borderRadius: "var(--radius-md)" }}>
                <div style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-muted)", fontWeight: 600 }}>{row[0]}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-strong)", textTransform: "capitalize", marginTop: 2, fontVariantNumeric: "tabular-nums" }}>{row[1]}</div>
                <div style={{ fontSize: "var(--text-2xs)", color: "var(--text-subtle)" }}>{row[2]}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card eyebrow="Medication context" title="GLP-1 treatment">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)" }}>
              <span style={{ color: "var(--text-muted)" }}>Medication</span><span style={{ color: "var(--text-strong)", fontWeight: 600 }}>{p.med}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)" }}>
              <span style={{ color: "var(--text-muted)" }}>Current dose</span><span style={{ color: "var(--text-strong)", fontWeight: 600 }}>{p.dose}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "var(--text-sm)" }}>
              <span style={{ color: "var(--text-muted)" }}>Dose changes</span>
              {p.doseChanges > 0 ? <Badge tone="caution" icon="arrow-up-right">{p.doseChangeNote}</Badge> : <Badge tone="neutral">None this window</Badge>}
            </div>
            <div style={{ height: 1, background: "var(--border-subtle)" }} />
            <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Symptom signals marked <Badge tone="accent" icon="syringe">injection-adjacent</Badge> occurred within 48 h of a recorded injection.
            </div>
          </div>
        </Card>
      </div>

      <Card eyebrow="Wearable trend highlights" title="Telemetry summary">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {highlights.map((h, i) => (
            <div key={i} style={{ display: "flex", gap: 11, padding: "12px 14px", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)" }}>
              <i data-lucide={h.icon} style={{ width: 18, height: 18, color: "var(--accent)", flex: "none", marginTop: 2 }}></i>
              <div>
                <div style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-muted)", fontWeight: 600 }}>{h.label}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-strong)", fontVariantNumeric: "tabular-nums" }}>{h.value}</div>
                <div style={{ fontSize: "var(--text-2xs)", color: "var(--text-subtle)" }}>{h.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card eyebrow="For discussion" title="Key discussion prompts">
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {prompts.map((t, i) => (
              <li key={i} style={{ display: "flex", gap: 10, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.45 }}>
                <span style={{ width: 20, height: 20, flex: "none", borderRadius: "var(--radius-sm)", background: "var(--accent-tint)", color: "var(--accent-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
        </Card>

        <Card eyebrow="Selected source evidence" title="Traceable to notes">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <EvidenceCard signal="nausea" level="severe" date="2026-06-03"
              snippet="Injection day. Strong nausea in the evening, threw up once. Very tired afterward."
              match="Strong nausea" injectionAdjacent />
            <EvidenceCard signal="low appetite" level="moderate" date="2026-06-05"
              snippet="Constipation continues. No appetite for dinner. Felt a little dizzy standing up."
              match="No appetite" />
          </div>
        </Card>
      </div>

      <SafetyNote />
    </div>
  );
}
window.Report = Report;
