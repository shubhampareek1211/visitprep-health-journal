"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { extractClinicalSignals } from "@/lib/nlp";
import type { PatientAnalyticsSummary, SyntheticPatient } from "@/types/health";

type DashboardVisualsProps = {
  patient: SyntheticPatient;
  analytics: PatientAnalyticsSummary;
};

type TooltipValue = string | number | Array<string | number>;

const chartMargin = { top: 12, right: 18, bottom: 8, left: 0 };

export function DashboardVisuals({ patient, analytics }: DashboardVisualsProps) {
  const symptomData = analytics.symptomFrequency.slice(0, 8).map((item) => ({
    symptom: item.name,
    count: item.count
  }));

  const trendData = patient.journalEntries
    .slice()
    .sort((left, right) => left.day - right.day)
    .map((entry) => ({
      day: `D${entry.day}`,
      dayNumber: entry.day,
      weight: entry.wearableMetrics.weightLb,
      sleep: entry.wearableMetrics.sleepHours,
      steps: entry.wearableMetrics.steps,
      activeMinutes: entry.wearableMetrics.activeMinutes,
      restingHeartRate: entry.wearableMetrics.restingHeartRate,
      strengthMinutes: entry.wearableMetrics.strengthTrainingMinutes
    }));

  const timelineData = patient.journalEntries
    .slice()
    .sort((left, right) => left.day - right.day)
    .map((entry) => {
      const signals = extractClinicalSignals(entry);
      return {
        day: entry.day,
        injectionDay: entry.injectionDay,
        doseChangeDay: entry.doseChangeDay,
        signalCount: signals.length
      };
    });

  return (
    <section id="dashboard" className="premium-panel p-5">
      <div className="flex flex-col gap-1">
        <p className="section-kicker">Signal dashboard</p>
        <h2 className="text-2xl font-semibold">Dashboard View</h2>
        <p className="text-sm leading-6 text-muted">
          Visual summary of symptom frequency, wearable trends, and 30-day
          journal context from synthetic data.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <ChartPanel title="Symptom Frequency">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={symptomData} margin={chartMargin}>
              <CartesianGrid stroke="#d7ded9" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="symptom"
                tick={{ fill: "#5f6862", fontSize: 11 }}
                interval={0}
                angle={-18}
                textAnchor="end"
                height={70}
              />
              <YAxis allowDecimals={false} tick={{ fill: "#5f6862", fontSize: 12 }} />
              <Tooltip content={<DashboardTooltip />} />
              <Bar
                dataKey="count"
                fill="#0f766e"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Weight Trend">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendData} margin={chartMargin}>
              <CartesianGrid stroke="#d7ded9" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: "#5f6862", fontSize: 11 }}
                interval={4}
              />
              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                tick={{ fill: "#5f6862", fontSize: 12 }}
              />
              <Tooltip content={<DashboardTooltip />} />
              <Line
                type="monotone"
                dataKey="weight"
                name="weight lb"
                stroke="#0f766e"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Sleep And Resting Heart Rate">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendData} margin={chartMargin}>
              <CartesianGrid stroke="#d7ded9" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: "#5f6862", fontSize: 11 }}
                interval={4}
              />
              <YAxis yAxisId="sleep" tick={{ fill: "#5f6862", fontSize: 12 }} />
              <YAxis
                yAxisId="heart"
                orientation="right"
                tick={{ fill: "#5f6862", fontSize: 12 }}
              />
              <Tooltip content={<DashboardTooltip />} />
              <Line
                yAxisId="sleep"
                type="monotone"
                dataKey="sleep"
                name="sleep hours"
                stroke="#0f766e"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                yAxisId="heart"
                type="monotone"
                dataKey="restingHeartRate"
                name="resting HR"
                stroke="#b45309"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <ChartLegend
            items={[
              { label: "Sleep hours", color: "bg-accent" },
              { label: "Resting HR", color: "bg-warning" }
            ]}
          />
        </ChartPanel>

        <ChartPanel title="Steps And Activity">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendData} margin={chartMargin}>
              <CartesianGrid stroke="#d7ded9" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: "#5f6862", fontSize: 11 }}
                interval={4}
              />
              <YAxis yAxisId="steps" tick={{ fill: "#5f6862", fontSize: 12 }} />
              <YAxis
                yAxisId="minutes"
                orientation="right"
                tick={{ fill: "#5f6862", fontSize: 12 }}
              />
              <Tooltip content={<DashboardTooltip />} />
              <Line
                yAxisId="steps"
                type="monotone"
                dataKey="steps"
                name="steps"
                stroke="#0f766e"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                yAxisId="minutes"
                type="monotone"
                dataKey="activeMinutes"
                name="active minutes"
                stroke="#6d5d00"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                yAxisId="minutes"
                type="monotone"
                dataKey="strengthMinutes"
                name="strength minutes"
                stroke="#475569"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <ChartLegend
            items={[
              { label: "Steps", color: "bg-accent" },
              { label: "Active minutes", color: "bg-[#6d5d00]" },
              { label: "Strength minutes", color: "bg-slate-600" }
            ]}
          />
        </ChartPanel>
      </div>

      <div className="mt-5 soft-card p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold">30-Day Timeline</h3>
          <p className="text-sm leading-6 text-muted">
            Each square represents one daily journal entry.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-10 gap-2 sm:grid-cols-[repeat(15,minmax(0,1fr))]">
          {timelineData.map((entry) => (
            <div
              key={entry.day}
              title={`Day ${entry.day}: ${timelineLabel(entry)}`}
              className={`flex aspect-square min-h-9 items-center justify-center rounded border font-mono text-xs font-semibold ${timelineClass(entry)}`}
            >
              {entry.day}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
          <TimelineLegend label="Injection" className="border-accent bg-panel-subtle" />
          <TimelineLegend label="Dose change" className="border-warning bg-yellow-50" />
          <TimelineLegend label="Symptoms" className="border-danger/40 bg-red-50" />
          <TimelineLegend label="Quiet day" className="border-border bg-panel" />
        </div>
      </div>
    </section>
  );
}

function ChartPanel({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="soft-card interactive-lift p-4">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="mt-3 h-[280px] min-w-0">{children}</div>
    </div>
  );
}

function DashboardTooltip({
  active,
  payload,
  label
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: TooltipValue; dataKey?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border bg-panel px-3 py-2 text-xs shadow-sm">
      <p className="font-mono font-semibold">{label}</p>
      <div className="mt-1 flex flex-col gap-1">
        {payload.map((item) => (
          <p key={`${item.dataKey}-${item.name}`} className="text-muted">
            {item.name ?? item.dataKey}:{" "}
            <span className="font-mono text-foreground">{String(item.value)}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function ChartLegend({
  items
}: {
  items: { label: string; color: string }[];
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function TimelineLegend({
  label,
  className
}: {
  label: string;
  className: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-3 w-3 rounded border ${className}`} />
      {label}
    </span>
  );
}

function timelineClass(entry: {
  injectionDay: boolean;
  doseChangeDay: boolean;
  signalCount: number;
}) {
  if (entry.doseChangeDay) {
    return "border-warning bg-yellow-50 text-warning";
  }
  if (entry.injectionDay) {
    return "border-accent bg-panel-subtle text-accent-strong";
  }
  if (entry.signalCount > 0) {
    return "border-danger/40 bg-red-50 text-danger";
  }
  return "border-border bg-panel text-muted";
}

function timelineLabel(entry: {
  injectionDay: boolean;
  doseChangeDay: boolean;
  signalCount: number;
}) {
  if (entry.doseChangeDay) {
    return "dose change day";
  }
  if (entry.injectionDay) {
    return "injection day";
  }
  if (entry.signalCount > 0) {
    return `${entry.signalCount} symptom signal${entry.signalCount === 1 ? "" : "s"}`;
  }
  return "quiet day";
}
