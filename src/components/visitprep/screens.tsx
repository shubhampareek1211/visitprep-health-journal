"use client";

import React from "react";
import {
  Badge, Button, Card, EvidenceCard, Icon, KpiCard, MiniBarChart, SafetyNote,
  SymptomChip, Textarea, Toggle
} from "@/components/ds";
import { NoteRow, PatientHeader, SectionLabel } from "@/components/visitprep/pieces";
import {
  buildReport, createNote, DEFAULT_NOTE_DATE, vpExtract,
  type Note, type Patient, type Symptom
} from "@/lib/visitprep/data";

const TODAY = DEFAULT_NOTE_DATE;

/* ── Overview ───────────────────────────────────────────────────────── */
export function Overview({ p, onAddNote }: { p: Patient; onAddNote: (note: Note) => void }) {
  const [draft, setDraft] = React.useState(
    "Felt nauseous after the injection and very tired by the afternoon. Couldn't sleep well."
  );
  const [isInjection, setIsInjection] = React.useState(true);
  const [extracted, setExtracted] = React.useState<Symptom[] | null>(null);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const extractTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (extractTimer.current) clearTimeout(extractTimer.current);
    if (savedTimer.current) clearTimeout(savedTimer.current);
  }, []);

  const wDelta = (p.weightEnd - p.weightStart).toFixed(1);

  function runExtract() {
    setBusy(true);
    setExtracted(null);
    extractTimer.current = setTimeout(() => {
      const sig = vpExtract(draft, isInjection);
      setExtracted(sig);
      setSelected(sig[0] ? sig[0].label : null);
      setBusy(false);
    }, 420);
  }

  function saveNote() {
    if (!draft.trim()) return;
    onAddNote(createNote(draft, isInjection, TODAY));
    setDraft("");
    setExtracted(null);
    setSelected(null);
    setSaved(true);
    savedTimer.current = setTimeout(() => setSaved(false), 2200);
  }

  const selSig = extracted && extracted.find((s) => s.label === selected);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <PatientHeader p={p} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
        <KpiCard label="Review window" value={p.reviewDays} unit="days" icon="calendar-range" hint={p.reviewWindow.split(",")[0]} />
        <KpiCard label="Injection days" value={p.injectionDays} icon="syringe" hint="this window" />
        <KpiCard label="Top symptom" value={<span style={{ fontSize: 18, textTransform: "capitalize" }}>{p.topSymptoms[0]}</span>} icon="activity" hint={p.symptomFreq[0].value + " of 30 days"} />
        <KpiCard label="Weight change" value={wDelta} unit="lb" icon="weight" delta={(((p.weightEnd - p.weightStart) / p.weightStart) * 100).toFixed(1) + "%"} hint="30 days" />
        <KpiCard label="Moderate+ days" value={p.moderateDays} unit="/ 30" icon="alert-triangle" deltaTone="caution" />
      </div>

      <Card eyebrow="Patient-reported notes" title="Add a journal note"
        action={<Badge tone="neutral" icon="cpu">Local deterministic extraction</Badge>}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
                <Icon name="calendar" size={15} style={{ color: "var(--text-muted)" }} />
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
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
              <Button variant="primary" icon={busy ? "loader" : "sparkles"} onClick={runExtract} disabled={busy || !draft.trim()}>
                {busy ? "Extracting…" : "Extract signals"}
              </Button>
              <Button variant="secondary" icon="plus" onClick={saveNote} disabled={!draft.trim()}>Save note</Button>
              {saved && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "var(--text-xs)", color: "var(--accent-text)" }}>
                  <Icon name="check" size={14} /> Saved to timeline
                </span>
              )}
            </div>
          </div>

          <div style={{ borderLeft: "1px solid var(--border-subtle)", paddingLeft: 18, display: "flex", flexDirection: "column" }}>
            <SectionLabel icon="activity">Extracted symptom signals</SectionLabel>
            {!extracted && !busy && (
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)", lineHeight: 1.5 }}>
                Signals appear here after extraction — each one traceable to a phrase in the note.
              </div>
            )}
            {busy && <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Scanning note…</div>}
            {extracted && extracted.length > 0 && (
              <>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {extracted.map((s, i) => (
                    <SymptomChip key={i} label={s.label} level={s.level} injectionAdjacent={s.inj}
                      selected={selected === s.label} onClick={() => setSelected(s.label)} />
                  ))}
                </div>
                {selSig && (
                  <div style={{ marginTop: 12 }}>
                    <EvidenceCard signal={selSig.label} level={selSig.level} date="2026-06-13"
                      snippet={selSig.evidenceText || draft} match={selSig.match} injectionAdjacent={selSig.inj}
                      confidence={selSig.confidence} assertionStatus={selSig.assertionStatus}
                      severityReason={selSig.severityReason} temporalContext={selSig.temporalContext}
                      injectionReason={selSig.relatedToInjectionReason} />
                  </div>
                )}
              </>
            )}
            {extracted && extracted.length === 0 && (
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>No known symptom terms matched in this note.</div>
            )}
          </div>
        </div>
      </Card>

      <Card eyebrow="Timeline" title="Recent journal notes"
        action={<Button variant="ghost" size="sm" iconRight="arrow-right">View all</Button>}>
        <div>
          {p.notes.map((n, i) => <NoteRow key={`${n.date}-${i}`} note={n} last={i === p.notes.length - 1} />)}
        </div>
      </Card>
    </div>
  );
}

/* ── Analytics ──────────────────────────────────────────────────────── */
function TrendChart({ values, color, height = 120 }: { values: number[]; color: string; height?: number }) {
  const w = 100, h = 100;
  const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - ((v - min) / span) * h] as const);
  const line = pts.map((pt, i) => (i ? "L" : "M") + pt[0].toFixed(2) + " " + pt[1].toFixed(2)).join(" ");
  const area = line + ` L ${w} ${h} L 0 ${h} Z`;
  const gid = "tg" + React.useId().replace(/:/g, "");
  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" width="100%" height={height} style={{ display: "block" }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.14" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="var(--viz-grid)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />)}
        <path d={area} fill={`url(#${gid})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="1.75" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Columns({ values, color, height = 110, unit }: { values: number[]; color: string; height?: number; unit?: string }) {
  const max = Math.max(...values);
  const slice = values.slice(-14);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
      {slice.map((v, i) => (
        <div key={i} title={v + (unit || "")} style={{
          flex: 1, height: Math.max(3, (v / max) * 100) + "%", background: color,
          borderRadius: "2px 2px 0 0", opacity: i === slice.length - 1 ? 1 : 0.78
        }} />
      ))}
    </div>
  );
}

function TimelineGrid({ p }: { p: Patient }) {
  const sevColor = ["var(--surface-sunken)", "var(--teal-300)", "var(--amber-400)", "var(--red-400)"];
  const sevLabel = ["none", "mild", "moderate", "severe"];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(15, 1fr)", gap: 5 }}>
        {p.timeline.map((sev, i) => (
          <div key={i} title={`Day ${i + 1}: ${sevLabel[sev]}${p.injectionMarks[i] ? " · injection" : ""}`}
            style={{ position: "relative", aspectRatio: "1", borderRadius: "var(--radius-xs)", background: sevColor[sev], border: "1px solid rgba(21,26,29,.04)" }}>
            {p.injectionMarks[i] === 1 && (
              <span style={{ position: "absolute", top: 2, right: 2, width: 4, height: 4, borderRadius: "50%", background: "var(--accent)" }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12, fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: sevColor[1] }} /> mild</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: sevColor[2] }} /> moderate</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: sevColor[3] }} /> severe</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginLeft: "auto" }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }} /> injection day</span>
      </div>
    </div>
  );
}

export function Analytics({ p }: { p: Patient }) {
  const w = p.wearables;
  const sleepAvg = (w.sleep.reduce((a, b) => a + b, 0) / w.sleep.length).toFixed(1);
  const rhrAvg = Math.round(w.rhr.reduce((a, b) => a + b, 0) / w.rhr.length);
  const stepsAvg = Math.round(w.steps.reduce((a, b) => a + b, 0) / w.steps.length / 100) * 100;

  const metric = (label: string, value: React.ReactNode, unit: string) => (
    <div>
      <div style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-muted)", fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-strong)", fontVariantNumeric: "tabular-nums" }}>{value}<span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", marginLeft: 3 }}>{unit}</span></div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card eyebrow="Patient-reported" title="Symptom frequency">
          <MiniBarChart unit=" d" data={p.symptomFreq} />
        </Card>
        <Card eyebrow="Wearable-style metric" title="Weight trend"
          action={<span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{p.weightStart} → {p.weightEnd} lb</span>}>
          <TrendChart values={w.weight} color="var(--viz-teal)" />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: "var(--text-2xs)", color: "var(--text-subtle)" }}>
            <span>May 14</span><span>Jun 12</span>
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card eyebrow="Wearable-style metric" title="Sleep & resting heart rate">
          <div style={{ display: "flex", gap: 24, marginBottom: 10 }}>
            {metric("Sleep avg", sleepAvg, "h")}
            {metric("Resting HR", rhrAvg, "bpm")}
          </div>
          <TrendChart values={w.sleep} color="var(--viz-slate)" height={70} />
          <div style={{ height: 1, background: "var(--border-subtle)", margin: "10px 0" }} />
          <TrendChart values={w.rhr} color="var(--viz-clay)" height={70} />
        </Card>
        <Card eyebrow="Wearable-style metric" title="Steps & active minutes"
          action={<span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>last 14 days</span>}>
          <div style={{ display: "flex", gap: 24, marginBottom: 10 }}>
            {metric("Steps avg", stepsAvg.toLocaleString(), "/ day")}
            {metric("Active", Math.round(w.activeMin.reduce((a, b) => a + b, 0) / w.activeMin.length), "min")}
          </div>
          <Columns values={w.steps} color="var(--viz-teal)" height={84} unit=" steps" />
          <div style={{ height: 10 }} />
          <Columns values={w.activeMin} color="var(--viz-sand)" height={48} unit=" min" />
        </Card>
      </div>

      <Card eyebrow="30-day snapshot" title="Symptom severity timeline">
        <TimelineGrid p={p} />
      </Card>
    </div>
  );
}

/* ── Report ─────────────────────────────────────────────────────────── */
export function Report({ p }: { p: Patient }) {
  const reportRef = React.useRef<HTMLDivElement>(null);
  const printTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const wDelta = (p.weightEnd - p.weightStart).toFixed(1);
  const report = buildReport(p);

  React.useEffect(() => () => {
    if (printTimer.current) clearTimeout(printTimer.current);
  }, []);

  function handlePrint() {
    window.print();
  }

  // Export the styled report to PDF via a clean print window (no app chrome),
  // cloning the page's stylesheets so the PDF matches the on-screen design.
  function handleExportPdf() {
    const el = reportRef.current;
    if (!el) return;
    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("[data-vp-chrome]").forEach((n) => n.remove());
    const heads = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((n) => n.outerHTML)
      .join("\n");
    const win = window.open("", "_blank", "width=900,height=1200");
    if (!win) {
      window.print();
      return;
    }
    win.document.open();
    win.document.write(
      `<!doctype html><html><head><base href="${location.origin}/"><meta charset="utf-8">` +
        `<title>VisitPrep Report — ${p.name} (${p.id})</title>${heads}` +
        `<style>html,body{background:var(--surface)!important;margin:0}body{padding:24px}` +
        `@page{margin:14mm}[data-vp-chrome]{display:none!important}</style></head>` +
        `<body>${clone.outerHTML}</body></html>`
    );
    win.document.close();
    win.focus();
    win.onafterprint = () => win.close();
    const fonts = (win.document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    const fire = () => { printTimer.current = setTimeout(() => win.print(), 150); };
    if (fonts?.ready) fonts.ready.then(fire);
    else fire();
  }
  const { prompts, highlights, evidence } = report;

  return (
    <div ref={reportRef} style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 14, padding: "18px 20px",
        background: "var(--surface)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)"
      }}>
        <span style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "var(--accent-tint)", color: "var(--accent-text)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <Icon name="file-text" size={22} />
        </span>
        <div>
          <h1 style={{ fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--text-strong)" }}>Doctor-ready visit summary</h1>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 2 }}>{p.name} · <span style={{ fontFamily: "var(--font-mono)" }}>{p.id}</span> · {p.reviewWindow}</div>
        </div>
        <div data-vp-chrome style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Button variant="secondary" size="md" icon="printer" onClick={handlePrint}>Print</Button>
          <Button variant="primary" size="md" icon="file-down" onClick={handleExportPdf}>Export PDF</Button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card eyebrow="30-day snapshot" title="At a glance">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {([
              ["Top symptom", p.topSymptoms[0], p.symptomFreq[0].value + " of 30 days"],
              ["Injection days", p.injectionDays, "in window"],
              ["Weight change", wDelta + " lb", "30 days"],
              ["Moderate+ days", p.moderateDays + " / 30", "patient-reported"]
            ] as const).map((row, i) => (
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
            <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.5, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              Symptom signals marked <Badge tone="accent" icon="syringe">injection-adjacent</Badge> occurred within 48 h of a recorded injection.
            </div>
          </div>
        </Card>
      </div>

      <Card eyebrow="Wearable trend highlights" title="Telemetry summary">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {highlights.map((h, i) => (
            <div key={i} style={{ display: "flex", gap: 11, padding: "12px 14px", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)" }}>
              <Icon name={h.icon} size={18} style={{ color: "var(--accent)", flex: "none", marginTop: 2 }} />
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
            {evidence.length > 0 ? (
              evidence.map((e, i) => (
                <EvidenceCard key={i} signal={e.signal} level={e.level} date={e.date}
                  snippet={e.snippet} match={e.match} injectionAdjacent={e.injectionAdjacent} />
              ))
            ) : (
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                No source evidence recorded for this window.
              </div>
            )}
          </div>
        </Card>
      </div>

      <SafetyNote />
    </div>
  );
}

/* ── RightRail ──────────────────────────────────────────────────────── */
function RailPanel({ eyebrow, icon, children }: { eyebrow: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
        <Icon name={icon} size={15} style={{ color: "var(--text-muted)" }} />
        <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-muted)", fontWeight: 600 }}>{eyebrow}</span>
      </div>
      {children}
    </div>
  );
}

export function RightRail({ p }: { p: Patient }) {
  const { prompts } = buildReport(p);
  const checks = [
    { label: "Review window set", done: true },
    { label: "Journal notes recorded", done: true, meta: p.notes.length + " notes" },
    { label: "Signals extracted", done: true },
    { label: "Wearable metrics synced", done: true },
    { label: "Clinician review", done: false, meta: "pending" }
  ];
  const done = checks.filter((c) => c.done).length;
  const pct = Math.round((done / checks.length) * 100);

  return (
    <aside data-vp-chrome style={{ width: "var(--rail-width)", flex: "none", display: "flex", flexDirection: "column", gap: 14 }}>
      <RailPanel eyebrow="Report readiness" icon="circle-check">
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
              <Icon name={c.done ? "check-circle-2" : "circle-dashed"} size={15} style={{ color: c.done ? "var(--accent)" : "var(--text-subtle)", flex: "none" }} />
              <span style={{ color: c.done ? "var(--text-body)" : "var(--text-muted)" }}>{c.label}</span>
              {c.meta && <span style={{ marginLeft: "auto", fontSize: "var(--text-2xs)", color: "var(--text-subtle)" }}>{c.meta}</span>}
            </div>
          ))}
        </div>
      </RailPanel>

      <RailPanel eyebrow="Key discussion prompts" icon="messages-square">
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
          {prompts.slice(0, 3).map((t, i) => (
            <li key={i} style={{ display: "flex", gap: 8, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.4 }}>
              <Icon name="dot" size={16} style={{ color: "var(--accent)", flex: "none" }} />{t}
            </li>
          ))}
        </ul>
      </RailPanel>

      <RailPanel eyebrow="Source evidence summary" icon="search-check">
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
      </RailPanel>

      <SafetyNote title="Safety boundary">
        No diagnosis or treatment advice. This summary organizes synthetic, patient-reported notes for clinician discussion.
      </SafetyNote>
    </aside>
  );
}

/* ── Secondary screens: Patients, Journal, Evidence ─────────────────── */
export function Patients({ patients, activeId, onSelect }: { patients: Patient[]; activeId: string; onSelect: (id: string) => void }) {
  return (
    <Card eyebrow="Synthetic cohort" title="Patients">
      <div style={{ display: "flex", flexDirection: "column" }}>
        {patients.map((p, i) => (
          <button key={p.id} onClick={() => onSelect(p.id)}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-sunken)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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
              {p.id === activeId ? <Badge tone="accent" icon="check">Active</Badge> : <Icon name="chevron-right" size={18} style={{ color: "var(--text-subtle)" }} />}
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}

export function Journal({ p, onAddNote }: { p: Patient; onAddNote: (note: Note) => void }) {
  const [composing, setComposing] = React.useState(false);
  const [text, setText] = React.useState("");
  const [inj, setInj] = React.useState(false);
  const [date, setDate] = React.useState(TODAY);

  function save() {
    if (!text.trim()) return;
    onAddNote(createNote(text, inj, date));
    setText("");
    setInj(false);
    setDate(TODAY);
    setComposing(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card eyebrow="Patient-reported notes" title="Journal timeline"
        action={<Button variant="primary" size="sm" icon={composing ? "x" : "plus"} onClick={() => setComposing((v) => !v)}>
          {composing ? "Cancel" : "Add note"}
        </Button>}>
        {composing && (
          <div style={{ paddingBottom: 16, marginBottom: 4, borderBottom: "1px solid var(--border-subtle)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
                <Icon name="calendar" size={15} style={{ color: "var(--text-muted)" }} />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--text-strong)",
                    border: "1px solid var(--border-strong)", borderRadius: "var(--radius-md)",
                    padding: "4px 8px", background: "var(--surface)"
                  }} />
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Toggle label="Injection day" checked={inj} onChange={setInj} />
              </div>
            </div>
            <Textarea rows={3} value={text} onChange={(e) => setText(e.target.value)}
              placeholder="How did you feel today? Note symptoms, appetite, sleep, injection context…"
              hint="Signals are extracted locally on save and traced back to your words." />
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <Button variant="primary" icon="plus" onClick={save} disabled={!text.trim() || !date}>Save note</Button>
              <Button variant="ghost" onClick={() => setComposing(false)}>Cancel</Button>
            </div>
          </div>
        )}
        <div>
          {p.notes.map((n, i) => <NoteRow key={`${n.date}-${i}`} note={n} last={i === p.notes.length - 1} />)}
        </div>
      </Card>
    </div>
  );
}

export function Evidence({ p }: { p: Patient }) {
  const items: (Symptom & { date: string; snippet: string })[] = [];
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
