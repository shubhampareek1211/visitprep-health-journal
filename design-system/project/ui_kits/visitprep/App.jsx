/* App shell — composes sidebar, topbar, active screen, and right rail. */
function App() {
  const data = window.VP_DATA;
  const [nav, setNav] = React.useState("overview");
  const [pid, setPid] = React.useState(data.patients[0].id);
  const p = data.patients.find((x) => x.id === pid);

  React.useEffect(() => { window.lucide && lucide.createIcons(); });

  const titles = {
    overview: "Overview", patients: "Patients", journal: "Journal",
    evidence: "Evidence", analytics: "Analytics", report: "Doctor Report",
  };
  const showRail = nav === "overview" || nav === "analytics";

  let screen = null;
  if (nav === "overview") screen = <window.Overview p={p} />;
  else if (nav === "patients") screen = <window.Patients patients={data.patients} activeId={pid} onSelect={(id) => { setPid(id); setNav("overview"); }} />;
  else if (nav === "journal") screen = <window.Journal p={p} />;
  else if (nav === "evidence") screen = <window.Evidence p={p} />;
  else if (nav === "analytics") screen = <window.Analytics p={p} />;
  else if (nav === "report") screen = <window.Report p={p} />;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--canvas)" }}>
      <window.Sidebar active={nav} onNavigate={setNav} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <window.Topbar patients={data.patients} activeId={pid} onSelectPatient={setPid} onExport={() => setNav("report")} />
        <div style={{ flex: 1, overflow: "auto" }}>
          <div style={{ maxWidth: showRail ? 1280 : "var(--content-max)", margin: "0 auto", padding: "20px 24px 40px", display: "flex", gap: 18, alignItems: "flex-start" }}>
            <main style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--text-strong)" }}>{titles[nav]}</h2>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>
                  <i data-lucide="shield-check" style={{ width: 14, height: 14 }}></i>
                  <span>No diagnosis or treatment advice</span>
                </div>
              </div>
              {screen}
            </main>
            {showRail && (
              <div className="vp-rail">
                <window.RightRail p={p} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
window.VPApp = App;
