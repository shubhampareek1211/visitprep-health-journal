"use client";

import React from "react";
import Image from "next/image";
import { Badge, Icon } from "@/components/ds";
import { Analytics, Evidence, Journal, Overview, Patients, Report, RightRail } from "@/components/visitprep/screens";
import { applyNote, VP_DATA, type Note, type Patient } from "@/lib/visitprep/data";

type NavId = "overview" | "patients" | "journal" | "evidence" | "analytics" | "report";

const NAV_ITEMS: { id: NavId; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "layout-dashboard" },
  { id: "patients", label: "Patients", icon: "users" },
  { id: "journal", label: "Journal", icon: "notebook-pen" },
  { id: "evidence", label: "Evidence", icon: "search-check" },
  { id: "analytics", label: "Analytics", icon: "line-chart" },
  { id: "report", label: "Doctor Report", icon: "file-text" }
];

function Sidebar({ active, onNavigate }: { active: NavId; onNavigate: (id: NavId) => void }) {
  return (
    <aside data-vp-chrome style={{
      width: "var(--sidebar-width)", flex: "none", background: "var(--surface)",
      borderRight: "1px solid var(--border-default)", display: "flex", flexDirection: "column", height: "100%"
    }}>
      <div style={{ display: "flex", alignItems: "center", height: "var(--topbar-height)", padding: "0 16px", borderBottom: "1px solid var(--border-subtle)" }}>
        <Image src="/assets/logo.svg" alt="VisitPrep Health Journal" width={169} height={26} priority />
      </div>

      <nav style={{ padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        <div style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-subtle)", fontWeight: 600, padding: "6px 10px 4px" }}>Workspace</div>
        {NAV_ITEMS.map((it) => {
          const isActive = active === it.id;
          return (
            <button key={it.id} onClick={() => onNavigate(it.id)}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "var(--surface-sunken)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 10px",
                border: "none", cursor: "pointer", textAlign: "left", borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: isActive ? 600 : 500,
                color: isActive ? "var(--accent-text)" : "var(--text-body)",
                background: isActive ? "var(--accent-tint)" : "transparent",
                transition: "background var(--duration-fast) var(--ease-standard)"
              }}>
              <Icon name={it.icon} size={18} style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }} />
              {it.label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "12px", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "9px 10px", background: "var(--surface-sunken)", borderRadius: "var(--radius-md)" }}>
          <Icon name="database" size={15} style={{ color: "var(--text-muted)", flex: "none", marginTop: 1 }} />
          <div>
            <div style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--text-strong)" }}>Synthetic data only</div>
            <div style={{ fontSize: "var(--text-2xs)", color: "var(--text-muted)", lineHeight: 1.4, marginTop: 1 }}>Local deterministic extraction · no network calls</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({
  patients, activeId, onSelectPatient, onExport
}: {
  patients: Patient[];
  activeId: string;
  onSelectPatient: (id: string) => void;
  onExport: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const active = patients.find((p) => p.id === activeId)!;

  return (
    <header data-vp-chrome style={{
      height: "var(--topbar-height)", flex: "none", display: "flex", alignItems: "center",
      gap: 14, padding: "0 20px", background: "var(--surface)", borderBottom: "1px solid var(--border-default)"
    }}>
      <div style={{ position: "relative" }}>
        <button onClick={() => setOpen(!open)} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "5px 10px 5px 6px",
          background: "var(--surface)", border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-sans)"
        }}>
          <span style={{
            width: 30, height: 30, borderRadius: "var(--radius-md)", background: "var(--accent-tint)",
            color: "var(--accent-text)", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, flex: "none"
          }}>{active.initials}</span>
          <span style={{ textAlign: "left" }}>
            <span style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)", lineHeight: 1.2 }}>{active.name}</span>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{active.id}</span>
          </span>
          <Icon name="chevrons-up-down" size={15} style={{ color: "var(--text-muted)" }} />
        </button>

        {open && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, width: 280, zIndex: 20,
            background: "var(--surface)", border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", padding: 6
          }}>
            <div style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-subtle)", fontWeight: 600, padding: "6px 8px 4px" }}>Synthetic patients</div>
            {patients.map((p) => (
              <button key={p.id} onClick={() => { onSelectPatient(p.id); setOpen(false); }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-sunken)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = p.id === activeId ? "var(--accent-tint)" : "transparent")}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px",
                  border: "none", borderRadius: "var(--radius-md)", cursor: "pointer", textAlign: "left",
                  background: p.id === activeId ? "var(--accent-tint)" : "transparent"
                }}>
                <span style={{ width: 28, height: 28, borderRadius: "var(--radius-md)", background: "var(--surface-sunken)", color: "var(--text-body)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flex: "none" }}>{p.initials}</span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)" }}>{p.name}</span>
                  <span style={{ display: "block", fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{p.med} · {p.dose}</span>
                </span>
                {p.id === activeId && <Icon name="check" size={16} style={{ color: "var(--accent)" }} />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--text-muted)", fontSize: "var(--text-xs)" }}>
        <Icon name="calendar-range" size={15} />
        <span>Review window</span>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-body)" }}>{active.reviewWindow}</span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <Badge tone="neutral" icon="lock">Synthetic · demo</Badge>
        <button onClick={onExport} style={{
          display: "inline-flex", alignItems: "center", gap: 7, height: "var(--control-h-md)", padding: "0 14px",
          background: "var(--accent)", color: "#fff", border: "1px solid var(--accent)",
          borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)", fontWeight: 600
        }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}>
          <Icon name="file-down" size={16} />
          Doctor report
        </button>
      </div>
    </header>
  );
}

export function Workspace() {
  const [nav, setNav] = React.useState<NavId>("overview");
  // Notes are mutable so "Save note" / "Add note" append to the timeline.
  const [patients, setPatients] = React.useState<Patient[]>(() =>
    VP_DATA.patients.map((pt) => ({ ...pt, notes: [...pt.notes] }))
  );
  const [pid, setPid] = React.useState(patients[0].id);
  const p = patients.find((x) => x.id === pid)!;
  const showRail = nav === "overview" || nav === "analytics";

  const addNote = React.useCallback((patientId: string, note: Note) => {
    setPatients((prev) => prev.map((pt) => (pt.id === patientId ? applyNote(pt, note) : pt)));
  }, []);

  let screen: React.ReactNode = null;
  if (nav === "overview") screen = <Overview key={pid} p={p} onAddNote={(note) => addNote(p.id, note)} />;
  else if (nav === "patients") screen = <Patients patients={patients} activeId={pid} onSelect={(id) => { setPid(id); setNav("overview"); }} />;
  else if (nav === "journal") screen = <Journal key={pid} p={p} onAddNote={(note) => addNote(p.id, note)} />;
  else if (nav === "evidence") screen = <Evidence p={p} />;
  else if (nav === "analytics") screen = <Analytics p={p} />;
  else if (nav === "report") screen = <Report p={p} />;

  return (
    <div data-vp-shell style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--canvas)" }}>
      <Sidebar active={nav} onNavigate={setNav} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar patients={patients} activeId={pid} onSelectPatient={setPid} onExport={() => setNav("report")} />
        <div data-vp-scroll style={{ flex: 1, overflow: "auto" }}>
          <div style={{ maxWidth: showRail ? 1280 : "var(--content-max)", margin: "0 auto", padding: "20px 24px 40px", display: "flex", gap: 18, alignItems: "flex-start" }}>
            <main style={{ flex: 1, minWidth: 0 }}>
              <div data-vp-chrome style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--text-strong)" }}>{NAV_ITEMS.find((i) => i.id === nav)!.label}</h2>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>
                  <Icon name="shield-check" size={14} />
                  <span>No diagnosis or treatment advice</span>
                </div>
              </div>
              {screen}
            </main>
            {showRail && <RightRail p={p} />}
          </div>
        </div>
      </div>
    </div>
  );
}
