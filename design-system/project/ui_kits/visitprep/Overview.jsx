/* Overview screen — patient summary, KPIs, journal input, extracted signals,
   recent notes. The default, narratable demo screen. */
function Overview({ p }) {
  const { Card, KpiCard, Button, Textarea, Toggle, SymptomChip, EvidenceCard, Badge } = window.VisitPrepDesignSystem_2c5c4e;
  const { PatientHeader, SectionLabel, NoteRow, vpExtract } = window;

  const [draft, setDraft] = React.useState("Felt nauseous after the injection and very tired by the afternoon. Couldn't sleep well.");
  const [isInjection, setIsInjection] = React.useState(true);
  const [extracted, setExtracted] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => { window.lucide && lucide.createIcons(); });

  const wDelta = (p.weightEnd - p.weightStart).toFixed(1);

  function runExtract() {
    setBusy(true);
    setExtracted(null);
    setTimeout(() => {
      const sig = vpExtract(draft, isInjection);
      setExtracted(sig);
      setSelected(sig[0] ? sig[0].label : null);
      setBusy(false);
    }, 420);
  }

  const selSig = extracted && extracted.find(s => s.label === selected);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <PatientHeader p={p} />

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
        <KpiCard label="Review window" value={p.reviewDays} unit="days" icon="calendar-range" hint={p.reviewWindow.split(",")[0]} />
        <KpiCard label="Injection days" value={p.injectionDays} icon="syringe" hint="this window" />
        <KpiCard label="Top symptom" value={<span style={{ fontSize: 18, textTransform: "capitalize" }}>{p.topSymptoms[0]}</span>} icon="activity" hint={p.symptomFreq[0].value + " of 30 days"} />
        <KpiCard label="Weight change" value={wDelta} unit="lb" icon="weight" delta={((p.weightEnd - p.weightStart) / p.weightStart * 100).toFixed(1) + "%"} hint="30 days" />
        <KpiCard label="Moderate+ days" value={p.moderateDays} unit="/ 30" icon="alert-triangle" deltaTone="caution" />
      </div>

      {/* Journal input + extraction */}
      <Card eyebrow="Patient-reported notes" title="Add a journal note"
        action={<Badge tone="neutral" icon="cpu">Local deterministic extraction</Badge>}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
                <i data-lucide="calendar" style={{ width: 15, height: 15, color: "var(--text-muted)" }}></i>
                <span style={{ fontFamily: "var(--font-mono)" }}>2026-06-13</span>
                <span style={{ color: "var(--text-subtle)" }}>· Sat</span>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Toggle label="Injection day" checked={isInjection} onChange={setIsInjection} />
              </div>
            </div>
            <Textarea rows={4} value={draft} onChange={(e) => setDraft(e.target.value)}
              placeholder="How did you feel today? Note symptoms, appetite, sleep, injection context…"
              hint="Notes are the source. Signals are extracted locally and traced back to your words." />
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <Button variant="primary" icon={busy ? "loader" : "sparkles"} onClick={runExtract} disabled={busy || !draft.trim()}>
                {busy ? "Extracting…" : "Extract signals"}
              </Button>
              <Button variant="secondary" icon="plus">Save note</Button>
            </div>
          </div>

          {/* Extraction output */}
          <div style={{ borderLeft: "1px solid var(--border-subtle)", paddingLeft: 18, display: "flex", flexDirection: "column" }}>
            <SectionLabel icon="activity">Extracted symptom signals</SectionLabel>
            {!extracted && !busy && (
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)", lineHeight: 1.5 }}>
                Signals appear here after extraction — each one traceable to a phrase in the note.
              </div>
            )}
            {busy && <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Scanning note…</div>}
            {extracted && extracted.length > 0 && (
              <React.Fragment>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {extracted.map((s, i) => (
                    <SymptomChip key={i} label={s.label} level={s.level} injectionAdjacent={s.inj}
                      selected={selected === s.label} onClick={() => setSelected(s.label)} />
                  ))}
                </div>
                {selSig && (
                  <div style={{ marginTop: 12 }}>
                    <EvidenceCard signal={selSig.label} level={selSig.level} date="2026-06-13"
                      snippet={draft} match={selSig.match} injectionAdjacent={selSig.inj} />
                  </div>
                )}
              </React.Fragment>
            )}
            {extracted && extracted.length === 0 && (
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>No known symptom terms matched in this note.</div>
            )}
          </div>
        </div>
      </Card>

      {/* Recent notes */}
      <Card eyebrow="Timeline" title="Recent journal notes"
        action={<Button variant="ghost" size="sm" iconRight="arrow-right">View all</Button>}>
        <div>
          {p.notes.map((n, i) => <NoteRow key={n.date} note={n} last={i === p.notes.length - 1} />)}
        </div>
      </Card>
    </div>
  );
}
window.Overview = Overview;
