/* Topbar — patient selector, review window, and global actions. */
function Topbar({ patients, activeId, onSelectPatient, onExport }) {
  const { Badge } = window.VisitPrepDesignSystem_2c5c4e;
  const [open, setOpen] = React.useState(false);
  const active = patients.find((p) => p.id === activeId);

  return (
    <header style={{
      height: "var(--topbar-height)", flex: "none", display: "flex", alignItems: "center",
      gap: 14, padding: "0 20px", background: "var(--surface)",
      borderBottom: "1px solid var(--border-default)",
    }}>
      {/* Patient selector */}
      <div style={{ position: "relative" }}>
        <button onClick={() => setOpen(!open)}
          style={{
            display: "flex", alignItems: "center", gap: 10, padding: "5px 10px 5px 6px",
            background: "var(--surface)", border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-sans)",
          }}>
          <span style={{
            width: 30, height: 30, borderRadius: "var(--radius-md)", background: "var(--accent-tint)",
            color: "var(--accent-text)", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, flex: "none",
          }}>{active.initials}</span>
          <span style={{ textAlign: "left" }}>
            <span style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)", lineHeight: 1.2 }}>{active.name}</span>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{active.id}</span>
          </span>
          <i data-lucide="chevrons-up-down" style={{ width: 15, height: 15, color: "var(--text-muted)" }}></i>
        </button>

        {open && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, width: 280, zIndex: 20,
            background: "var(--surface)", border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", padding: 6,
          }}>
            <div style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-subtle)", fontWeight: 600, padding: "6px 8px 4px" }}>Synthetic patients</div>
            {patients.map((p) => (
              <button key={p.id} onClick={() => { onSelectPatient(p.id); setOpen(false); }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-sunken)"}
                onMouseLeave={(e) => e.currentTarget.style.background = p.id === activeId ? "var(--accent-tint)" : "transparent"}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px",
                  border: "none", borderRadius: "var(--radius-md)", cursor: "pointer", textAlign: "left",
                  background: p.id === activeId ? "var(--accent-tint)" : "transparent",
                }}>
                <span style={{ width: 28, height: 28, borderRadius: "var(--radius-md)", background: "var(--surface-sunken)", color: "var(--text-body)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flex: "none" }}>{p.initials}</span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)" }}>{p.name}</span>
                  <span style={{ display: "block", fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{p.med} · {p.dose}</span>
                </span>
                {p.id === activeId && <i data-lucide="check" style={{ width: 16, height: 16, color: "var(--accent)" }}></i>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--text-muted)", fontSize: "var(--text-xs)" }}>
        <i data-lucide="calendar-range" style={{ width: 15, height: 15 }}></i>
        <span>Review window</span>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-body)" }}>{active.reviewWindow}</span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <Badge tone="neutral" icon="lock">Synthetic · demo</Badge>
        <button onClick={onExport} style={{
          display: "inline-flex", alignItems: "center", gap: 7, height: "var(--control-h-md)", padding: "0 14px",
          background: "var(--accent)", color: "#fff", border: "1px solid var(--accent)",
          borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)", fontWeight: 600,
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "var(--accent-hover)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "var(--accent)"}>
          <i data-lucide="file-down" style={{ width: 16, height: 16 }}></i>
          Doctor report
        </button>
      </div>
    </header>
  );
}
window.Topbar = Topbar;
