"use client";

import type { DoctorReport } from "@/types/health";

type DoctorReportPreviewProps = {
  report: DoctorReport;
};

export function DoctorReportPreview({ report }: DoctorReportPreviewProps) {
  return (
    <section id="report" className="premium-panel p-5">
      <div className="flex flex-col gap-1">
        <p className="section-kicker">Doctor-ready preview</p>
        <h2 className="text-2xl font-semibold">Visit Summary Report</h2>
        <p className="text-sm leading-6 text-muted">
          Deterministic report generated from local analytics, source notes, and
          wearable-style metrics.
        </p>
      </div>

      <div className="mt-5 soft-card border-accent/30 bg-panel-subtle p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <ReportMetric label="Patient" value={report.patientLabel} />
          <ReportMetric label="Synthetic ID" value={report.patientId} />
          <ReportMetric label="Review window" value={report.dateRange} />
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">
          {report.syntheticDataNotice}
        </p>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <ReportSection title="30-Day Snapshot" items={report.snapshot} />
        <ReportSection title="Medication Context" items={report.medicationContext} />
        <ReportSection
          title="Wearable Trend Highlights"
          items={report.wearableHighlights}
        />
        <ReportSection
          title="Discussion Prompts"
          items={report.discussionPrompts}
        />
      </div>

      <div className="mt-5 soft-card p-4">
        <h3 className="text-base font-semibold">Top Symptom Signals</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {report.symptomHighlights.map((item) => (
            <span key={item.name} className="chip">
              {item.name}: {item.count}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 soft-card p-4">
        <h3 className="text-base font-semibold">Selected Source Evidence</h3>
        <p className="mt-1 text-sm leading-6 text-muted">
          Notes are quoted from the synthetic journal so the summary remains
          traceable to source text.
        </p>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {report.evidenceNotes.map((note) => (
            <article
              key={`${report.patientId}-evidence-${note.day}`}
              className="soft-card bg-panel p-4"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-muted">
                  Day {note.day} · {note.date}
                </span>
                {note.injectionDay ? <ReportBadge>Injection</ReportBadge> : null}
                {note.doseChangeDay ? <ReportBadge>Dose change</ReportBadge> : null}
              </div>
              <p className="mt-3 text-sm leading-6">{note.note}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {note.symptoms.map((symptom) => (
                  <span
                    key={`${note.day}-${symptom}`}
                    className="chip chip-muted"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-5 soft-card border-warning/30 bg-yellow-50 p-4">
        <h3 className="text-base font-semibold text-warning">Safety Boundary</h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          {report.safetyDisclaimer}
        </p>
      </div>
    </section>
  );
}

function ReportSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="soft-card p-4">
      <h3 className="text-base font-semibold">{title}</h3>
      <ul className="mt-3 flex flex-col gap-2 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ReportMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card border-accent/20 bg-panel">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-sm font-semibold">{value}</p>
    </div>
  );
}

function ReportBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-accent/30 bg-panel-subtle px-2 py-0.5 font-medium text-accent-strong">
      {children}
    </span>
  );
}
