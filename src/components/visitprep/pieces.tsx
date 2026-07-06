"use client";

import { ReactNode } from "react";
import { Badge, Icon, SymptomChip } from "@/components/ds";
import type { Note, Patient } from "@/lib/visitprep/data";

export function SectionLabel({ children, icon }: { children: ReactNode; icon?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
      {icon && <Icon name={icon} size={15} style={{ color: "var(--text-muted)" }} />}
      <span style={{
        fontSize: "var(--text-2xs)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-muted)", fontWeight: 600
      }}>{children}</span>
    </div>
  );
}

export function PatientHeader({ p }: { p: Patient }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
      background: "var(--surface)", border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xs)"
    }}>
      <span style={{
        width: 52, height: 52, borderRadius: "var(--radius-lg)", flex: "none",
        background: "var(--accent-tint)", color: "var(--accent-text)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 700
      }}>{p.initials}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h1 style={{ fontSize: "var(--text-h1)", fontWeight: 700, color: "var(--text-strong)" }}>{p.name}</h1>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-muted)",
            background: "var(--surface-sunken)", padding: "2px 7px", borderRadius: "var(--radius-sm)"
          }}>{p.id}</span>
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

export function NoteRow({ note, last }: { note: Note; last?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: last ? "none" : "1px solid var(--border-subtle)" }}>
      <div style={{ width: 52, flex: "none", textAlign: "center" }}>
        <div style={{ fontSize: "var(--text-2xs)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{note.day}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)" }}>{note.date.slice(5)}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          {note.injection && <Badge tone="accent" icon="syringe">Injection day</Badge>}
          {note.symptoms.some((s) => s.level === "severe") && <Badge tone="danger">Severe reported</Badge>}
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
