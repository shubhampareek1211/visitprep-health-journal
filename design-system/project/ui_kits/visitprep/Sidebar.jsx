/* Sidebar — persistent left navigation. */
function Sidebar({ active, onNavigate }) {
  const items = [
    { id: "overview", label: "Overview", icon: "layout-dashboard" },
    { id: "patients", label: "Patients", icon: "users" },
    { id: "journal", label: "Journal", icon: "notebook-pen" },
    { id: "evidence", label: "Evidence", icon: "search-check" },
    { id: "analytics", label: "Analytics", icon: "line-chart" },
    { id: "report", label: "Doctor Report", icon: "file-text" },
  ];
  return (
    <aside style={{
      width: "var(--sidebar-width)", flex: "none", background: "var(--surface)",
      borderRight: "1px solid var(--border-default)", display: "flex", flexDirection: "column",
      height: "100%",
    }}>
      <div style={{ display: "flex", alignItems: "center", height: "var(--topbar-height)", padding: "0 16px", borderBottom: "1px solid var(--border-subtle)" }}>
        <img src="assets/logo.svg" alt="VisitPrep Health Journal" height="26" />
      </div>

      <nav style={{ padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        <div style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-subtle)", fontWeight: 600, padding: "6px 10px 4px" }}>Workspace</div>
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <button key={it.id} onClick={() => onNavigate(it.id)}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "var(--surface-sunken)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "8px 10px", border: "none", cursor: "pointer", textAlign: "left",
                borderRadius: "var(--radius-md)", fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)", fontWeight: isActive ? 600 : 500,
                color: isActive ? "var(--accent-text)" : "var(--text-body)",
                background: isActive ? "var(--accent-tint)" : "transparent",
                transition: "background var(--duration-fast) var(--ease-standard)",
              }}>
              <i data-lucide={it.icon} style={{ width: 18, height: 18, color: isActive ? "var(--accent)" : "var(--text-muted)" }}></i>
              {it.label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "12px", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "9px 10px", background: "var(--surface-sunken)", borderRadius: "var(--radius-md)" }}>
          <i data-lucide="database" style={{ width: 15, height: 15, color: "var(--text-muted)", flex: "none", marginTop: 1 }}></i>
          <div>
            <div style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--text-strong)" }}>Synthetic data only</div>
            <div style={{ fontSize: "var(--text-2xs)", color: "var(--text-muted)", lineHeight: 1.4, marginTop: 1 }}>Local deterministic extraction · no network calls</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
window.Sidebar = Sidebar;
