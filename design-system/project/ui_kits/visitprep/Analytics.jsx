/* Analytics screen — dashboard charts. Integrated, not oversized. */
function TrendChart({ values, color, height = 120, fmt }) {
  const w = 100, h = 100;
  const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - ((v - min) / span) * h]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(2) + " " + p[1].toFixed(2)).join(" ");
  const area = line + ` L ${w} ${h} L 0 ${h} Z`;
  const gid = "tg" + Math.random().toString(36).slice(2, 7);
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

function Columns({ values, color, height = 110, unit }) {
  const max = Math.max(...values);
  const slice = values.slice(-14);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
      {slice.map((v, i) => (
        <div key={i} title={v + (unit || "")} style={{
          flex: 1, height: Math.max(3, (v / max) * 100) + "%", background: color,
          borderRadius: "2px 2px 0 0", opacity: i === slice.length - 1 ? 1 : 0.78,
        }} />
      ))}
    </div>
  );
}

function TimelineGrid({ p }) {
  const sevColor = ["var(--surface-sunken)", "var(--teal-300)", "var(--amber-400, #e6b24f)", "var(--red-400, #e59389)"];
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

function Analytics({ p }) {
  const { Card, MiniBarChart } = window.VisitPrepDesignSystem_2c5c4e;
  React.useEffect(() => { window.lucide && lucide.createIcons(); });
  const w = p.wearables;
  const sleepAvg = (w.sleep.reduce((a, b) => a + b, 0) / w.sleep.length).toFixed(1);
  const rhrAvg = Math.round(w.rhr.reduce((a, b) => a + b, 0) / w.rhr.length);
  const stepsAvg = Math.round(w.steps.reduce((a, b) => a + b, 0) / w.steps.length / 100) * 100;

  const metric = (label, value, unit) => (
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
window.Analytics = Analytics;
