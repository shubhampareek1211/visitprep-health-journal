"use client";

import { useMemo, useState } from "react";
import type { SyntheticDataset, SyntheticPatient } from "@/types/health";
import { extractClinicalSignals } from "@/lib/nlp";
import { buildPatientAnalyticsSummary } from "@/lib/analytics";
import { DashboardVisuals } from "./DashboardVisuals";
import { buildDoctorReport } from "@/lib/report";
import { DoctorReportPreview } from "./DoctorReportPreview";
import { JournalEntryInput } from "./JournalEntryInput";

type PatientDataExplorerProps = {
  dataset: SyntheticDataset;
};

export function PatientDataExplorer({ dataset }: PatientDataExplorerProps) {
  const [selectedPatientId, setSelectedPatientId] = useState(
    dataset.patients[0]?.id ?? ""
  );

  const selectedPatient = useMemo(
    () =>
      dataset.patients.find((patient) => patient.id === selectedPatientId) ??
      dataset.patients[0],
    [dataset.patients, selectedPatientId]
  );

  if (!selectedPatient) {
    return (
      <section className="rounded-lg border border-danger/30 bg-panel p-5 text-danger">
        No synthetic patient data is available.
      </section>
    );
  }

  return (
    <section id="patients" className="flex flex-col gap-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {dataset.patients.map((patient) => (
          <button
            type="button"
            key={patient.id}
            onClick={() => setSelectedPatientId(patient.id)}
            aria-pressed={selectedPatient.id === patient.id}
            className={`interactive-lift min-h-28 rounded-lg border p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              selectedPatient.id === patient.id
                ? "border-accent bg-panel shadow-[0_18px_50px_rgba(15,118,110,0.12)]"
                : "border-border bg-panel/80 hover:border-accent/60"
            }`}
          >
            <span className="block text-sm font-semibold">{patient.displayName}</span>
            <span className="mt-1 block font-mono text-xs text-muted">
              {patient.id}
            </span>
            <span className="mt-3 block text-xs leading-5 text-muted">
              {patient.journalEntries.length} daily notes
            </span>
          </button>
        ))}
      </div>

      <PatientOverview patient={selectedPatient} />
    </section>
  );
}

function PatientOverview({ patient }: { patient: SyntheticPatient }) {
  const summary = patient.thirtyDaySummary;
  const analytics = buildPatientAnalyticsSummary(patient.id, patient.journalEntries);
  const report = buildDoctorReport(
    patient,
    "All content in this report is synthetic and fictional. It is intended for MVP demonstration and should not be used for clinical care."
  );
  const latestEntries = patient.journalEntries.slice(-6).reverse();
  const symptomaticPreviewEntries = patient.journalEntries
    .filter((entry) => entry.annotatedSymptoms.length > 0)
    .slice(0, 4);
  const noSymptomPreviewEntry = patient.journalEntries.find(
    (entry) => entry.annotatedSymptoms.length === 0
  );
  const previewEntries = noSymptomPreviewEntry
    ? [...symptomaticPreviewEntries, noSymptomPreviewEntry]
    : symptomaticPreviewEntries;
  const topSymptoms = summary.topReportedSymptoms.slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]">
        <section className="premium-panel p-5">
          <div className="flex flex-col gap-1">
            <p className="section-kicker">{patient.id}</p>
            <h2 className="text-2xl font-semibold">{patient.displayName}</h2>
            <p className="text-sm leading-6 text-muted">
              Age range {patient.syntheticPatientProfile.ageRange}.{" "}
              {patient.syntheticPatientProfile.context}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Metric label="Injection days" value={formatDays(summary.injectionDays)} />
            <Metric
              label="Dose changes"
              value={
                summary.doseChangeDays.length > 0
                  ? formatDays(summary.doseChangeDays)
                  : "None noted"
              }
            />
            <Metric label="Weight change" value={`${summary.weightChangeLb} lb`} />
            <Metric
              label="Moderate symptom days"
              value={String(summary.moderateSymptomDays)}
            />
            <Metric
              label="Sleep, week 1 to week 4"
              value={`${summary.avgSleepFirstWeek}h -> ${summary.avgSleepLastWeek}h`}
            />
            <Metric
              label="Steps, week 1 to week 4"
              value={`${summary.avgStepsFirstWeek.toLocaleString()} -> ${summary.avgStepsLastWeek.toLocaleString()}`}
            />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold">Top Reported Symptoms</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {summary.topReportedSymptoms.slice(0, 7).map(([symptom, count]) => (
                <span key={symptom} className="chip">
                  {symptom}: {count}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="premium-panel p-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">Recent Journal Notes</h2>
            <p className="text-sm leading-6 text-muted">
              Raw patient-generated notes are shown directly so future summaries can
              remain traceable to source evidence.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {latestEntries.map((entry) => (
              <article
                key={`${patient.id}-${entry.day}`}
                className="soft-card p-4"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono text-muted">
                    Day {entry.day} · {entry.date}
                  </span>
                  {entry.injectionDay ? <Badge tone="accent">Injection</Badge> : null}
                  {entry.doseChangeDay ? <Badge tone="warning">Dose change</Badge> : null}
                  {entry.annotatedSymptoms.length > 0 ? (
                    <Badge tone="neutral">
                      {entry.annotatedSymptoms.length} symptom signals
                    </Badge>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-6">{entry.rawJournalNote}</p>
                {entry.annotatedSymptoms.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.annotatedSymptoms.map((symptom) => (
                      <span
                        key={`${entry.day}-${symptom.name}`}
                        className="chip chip-muted"
                      >
                        {symptom.name} · {symptom.severity}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <InsightTile
          kicker="Primary pattern"
          title={topSymptoms.length > 0 ? topSymptoms.map(([name]) => name).join(", ") : "No symptom pattern"}
          body="Most frequent patient-reported signals in the synthetic review window."
        />
        <InsightTile
          kicker="Injection context"
          title={`${analytics.injectionAdjacentSignalCount} adjacent signals`}
          body="Signals that appear near injection or dose-change context."
        />
        <InsightTile
          kicker="Doctor prep"
          title={`${report.discussionPrompts.length} prompts`}
          body="Questions framed for review without diagnosis or treatment instruction."
        />
      </div>

      <JournalEntryInput />

      <section id="evidence" className="premium-panel p-5">
        <div className="flex flex-col gap-1">
          <p className="section-kicker">Evidence explorer</p>
          <h2 className="text-2xl font-semibold">Local NLP Extraction Preview</h2>
          <p className="text-sm leading-6 text-muted">
            Rule-based extraction runs locally against raw journal text and returns
            auditable symptom signals with source evidence.
          </p>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {previewEntries.map((entry) => (
            <NlpPreviewCard key={`${patient.id}-nlp-${entry.day}`} entry={entry} />
          ))}
        </div>
      </section>

      <DashboardVisuals patient={patient} analytics={analytics} />

      <AnalyticsPreview analytics={analytics} />

      <DoctorReportPreview report={report} />
    </div>
  );
}

function AnalyticsPreview({
  analytics
}: {
  analytics: ReturnType<typeof buildPatientAnalyticsSummary>;
}) {
  const trends = analytics.wearableTrends;

  return (
    <section id="analytics" className="premium-panel p-5">
      <div className="flex flex-col gap-1">
        <p className="section-kicker">Advanced analytics</p>
        <h2 className="text-2xl font-semibold">Analytics Engine Preview</h2>
        <p className="text-sm leading-6 text-muted">
          Deterministic summaries computed from local NLP signals and
          wearable-style metrics.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Journal entries" value={String(analytics.entryCount)} />
        <Metric label="Extracted signals" value={String(analytics.signalCount)} />
        <Metric
          label="Injection-adjacent signals"
          value={String(analytics.injectionAdjacentSignalCount)}
        />
        <Metric
          label="Moderate symptom signals"
          value={String(analytics.severityDistribution.moderate)}
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <AnalyticsList title="Top Symptoms" items={analytics.topSymptoms} />
        <AnalyticsList
          title="Injection-Adjacent Symptoms"
          items={analytics.injectionAdjacentSymptomFrequency.slice(0, 5)}
        />
        <AnalyticsList
          title="Signal Categories"
          items={analytics.categoryFrequency}
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <TrendMetric
          label="Weight"
          unit="lb"
          first={trends.weightLb.firstValue}
          last={trends.weightLb.lastValue}
          change={trends.weightLb.change}
        />
        <TrendMetric
          label="Sleep average"
          unit="h"
          first={trends.sleepHours.firstWeekAverage}
          last={trends.sleepHours.lastWeekAverage}
          change={trends.sleepHours.averageChange}
        />
        <TrendMetric
          label="Steps average"
          unit=""
          first={trends.steps.firstWeekAverage}
          last={trends.steps.lastWeekAverage}
          change={trends.steps.averageChange}
          wholeNumber
        />
        <TrendMetric
          label="Resting heart rate"
          unit="bpm"
          first={trends.restingHeartRate.firstWeekAverage}
          last={trends.restingHeartRate.lastWeekAverage}
          change={trends.restingHeartRate.averageChange}
        />
        <TrendMetric
          label="Active minutes"
          unit="min"
          first={trends.activeMinutes.firstWeekAverage}
          last={trends.activeMinutes.lastWeekAverage}
          change={trends.activeMinutes.averageChange}
        />
        <TrendMetric
          label="Strength minutes"
          unit="min"
          first={trends.strengthTrainingMinutes.firstWeekAverage}
          last={trends.strengthTrainingMinutes.lastWeekAverage}
          change={trends.strengthTrainingMinutes.averageChange}
        />
      </div>
    </section>
  );
}

function AnalyticsList({
  title,
  items
}: {
  title: string;
  items: { name: string; count: number }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span key={`${title}-${item.name}`} className="chip">
              {item.name}: {item.count}
            </span>
          ))
        ) : (
          <span className="chip chip-muted">
            No signals
          </span>
        )}
      </div>
    </div>
  );
}

function TrendMetric({
  label,
  unit,
  first,
  last,
  change,
  wholeNumber = false
}: {
  label: string;
  unit: string;
  first: number;
  last: number;
  change: number;
  wholeNumber?: boolean;
}) {
  const formattedFirst = formatTrendValue(first, unit, wholeNumber);
  const formattedLast = formatTrendValue(last, unit, wholeNumber);
  const formattedChange = formatSignedChange(change, unit, wholeNumber);

  return (
    <div className="metric-card">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-lg font-semibold">
        {formattedFirst} -&gt; {formattedLast}
      </p>
      <p className="mt-1 text-xs text-muted">Change: {formattedChange}</p>
    </div>
  );
}

function NlpPreviewCard({
  entry
}: {
  entry: SyntheticPatient["journalEntries"][number];
}) {
  const signals = extractClinicalSignals(entry);

  return (
    <article className="soft-card p-4">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-mono text-muted">
          Day {entry.day} · {entry.date}
        </span>
        {entry.injectionDay ? <Badge tone="accent">Injection</Badge> : null}
        {entry.doseChangeDay ? <Badge tone="warning">Dose change</Badge> : null}
      </div>
      <p className="mt-3 text-sm leading-6">{entry.rawJournalNote}</p>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-normal text-muted">
          Extracted Signals
        </p>
        {signals.length > 0 ? (
          <div className="mt-2 flex flex-col gap-2">
            {signals.map((signal) => (
              <div
                key={`${signal.entryId}-${signal.symptom}`}
                className="soft-card bg-panel p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip">{signal.symptom}</span>
                  <span className="font-mono text-xs text-muted">
                    {signal.category} · {signal.severity} ·{" "}
                    {Math.round(signal.confidence * 100)}%
                  </span>
                  <span className="chip chip-muted">
                    {signal.assertionStatus}
                  </span>
                  {signal.relatedToInjection ? (
                    <span className="chip chip-muted">
                      injection-related context
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-xs leading-5 text-muted">
                  Evidence: <span>{signal.evidenceText}</span>
                </p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Matched &quot;{signal.matchedText}&quot; · {signal.severityReason}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 soft-card p-3 text-sm text-muted">
            No tracked symptom detected in this note.
          </p>
        )}
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-lg font-semibold">{value}</p>
    </div>
  );
}

function InsightTile({
  kicker,
  title,
  body
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <article className="premium-panel interactive-lift p-5">
      <p className="section-kicker">{kicker}</p>
      <h2 className="mt-3 text-xl font-semibold leading-7">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
    </article>
  );
}

function Badge({
  children,
  tone
}: {
  children: React.ReactNode;
  tone: "accent" | "warning" | "neutral";
}) {
  const className =
    tone === "accent"
      ? "border-accent/40 bg-panel-subtle text-accent-strong"
      : tone === "warning"
        ? "border-warning/40 bg-yellow-50 text-warning"
        : "border-border bg-panel-subtle text-muted";

  return (
    <span className={`rounded-full border px-2 py-0.5 font-medium ${className}`}>
      {children}
    </span>
  );
}

function formatDays(days: number[]) {
  return days.map((day) => `D${day}`).join(", ");
}

function formatTrendValue(value: number, unit: string, wholeNumber: boolean) {
  const formatted = wholeNumber
    ? Math.round(value).toLocaleString()
    : value.toLocaleString(undefined, {
        maximumFractionDigits: 1,
        minimumFractionDigits: Number.isInteger(value) ? 0 : 1
      });

  return unit ? `${formatted} ${unit}` : formatted;
}

function formatSignedChange(value: number, unit: string, wholeNumber: boolean) {
  const formatted = formatTrendValue(Math.abs(value), unit, wholeNumber);
  if (value > 0) {
    return `+${formatted}`;
  }
  if (value < 0) {
    return `-${formatted}`;
  }
  return unit ? `0 ${unit}` : "0";
}
