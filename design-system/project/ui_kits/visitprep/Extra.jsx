/* Secondary screens: Patients list, Journal (full timeline), Evidence index. */
function Patients({ patients, activeId, onSelect }) {
  const { Card, Badge } = window.VisitPrepDesignSystem_2c5c4e;
  React.useEffect(() => { window.lucide && lucide.createIcons(); });
  return (
    <Card eyebrow="Synthetic cohort" title="Patients">
      <div style={{ display: "flex", flexDirection: "column" }}>
        {patients.map((p, i) => (
          <button key={p.id} onClick={() => onSelect(p.id)}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-sunken)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 8px", border: "none", borderTop: i ? "1px solid var(--border-subtle)" : "none", background: "transparent", cursor: "pointer", textAlign: "left", borderRadius: "var(--radius-sm)" }}>
            <span style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "var(--accent-tint)", color: "var(--accent-text)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flex: "none" }}>{p.initials}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "var(--text-body-lg)", fontWeight: 600, color: "var(--text-strong)" }}>{p.name}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{p.id}</span>
              </div>
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{p.med} · {p.dose}</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
              <Badge tone="neutral">{p.moderateDays} moderate+ days</Badge>
              {p.id === activeId ? <Badge tone="accent" icon="check">Active</Badge> : <i data-lucide="chevron-right" style={{ width: 18, height: 18, color: "var(--text-subtle)" }}></i>}
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}
window.Patients = Patients;

function Journal({ p }) {
  const { Card, Button, Badge } = window.VisitPrepDesignSystem_2c5c4e;
  const { NoteRow } = window;
  React.useEffect(() => { window.lucide && lucide.createIcons(); });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card eyebrow="Patient-reported notes" title="Journal timeline"
        action={<Button variant="primary" size="sm" icon="plus">Add note</Button>}>
        <div>
          {p.notes.map((n, i) => <NoteRow key={n.date} note={n} last={i === p.notes.length - 1} />)}
        </div>
      </Card>
    </div>
  );
}
window.Journal = Journal;

function Evidence({ p }) {
  const { Card, EvidenceCard, Badge } = window.VisitPrepDesignSystem_2c5c4e;
  React.useEffect(() => { window.lucide && lucide.createIcons(); });
  const items = [];
  p.notes.forEach((n) => n.symptoms.forEach((s) => items.push({ ...s, date: n.date, snippet: n.text })));
  return (
    <Card eyebrow="Selected source evidence" title="Signal → source index"
      action={<Badge tone="neutral" icon="cpu">Local deterministic extraction</Badge>}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {items.slice(0, 8).map((it, i) => (
          <EvidenceCard key={i} signal={it.label} level={it.level} date={it.date} snippet={it.snippet} match={it.match} injectionAdjacent={it.inj} />
        ))}
      </div>
    </Card>
  );
}
window.Evidence = Evidence;
