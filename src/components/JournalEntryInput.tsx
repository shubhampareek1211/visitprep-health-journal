"use client";

import { useMemo, useState } from "react";
import { extractClinicalSignals } from "@/lib/nlp";
import type { JournalEntry } from "@/types/health";

type LocalJournalEntry = {
  id: string;
  entry: JournalEntry;
};

const defaultNote =
  "Felt nauseous after the injection and tired by dinner. Appetite was low but I kept water nearby.";

export function JournalEntryInput() {
  const [date, setDate] = useState("2026-05-31");
  const [note, setNote] = useState(defaultNote);
  const [injectionDay, setInjectionDay] = useState(false);
  const [submittedEntries, setSubmittedEntries] = useState<LocalJournalEntry[]>([]);

  const latestEntry = submittedEntries[0]?.entry ?? null;
  const latestSignals = useMemo(
    () => (latestEntry ? extractClinicalSignals(latestEntry) : []),
    [latestEntry]
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedNote = note.trim();

    if (!trimmedNote) {
      return;
    }

    const nextEntry: JournalEntry = {
      day: 31 + submittedEntries.length,
      date,
      rawJournalNote: `${date} - ${trimmedNote}`,
      injectionDay,
      doseChangeDay: false,
      selfRatedSeverity: 0,
      annotatedSymptoms: [],
      wearableMetrics: {
        weightLb: 0,
        restingHeartRate: 0,
        sleepHours: 0,
        steps: 0,
        activeMinutes: 0,
        strengthTrainingMinutes: 0
      }
    };

    setSubmittedEntries((current) => [
      {
        id: `${date}-${Date.now()}`,
        entry: nextEntry
      },
      ...current
    ]);
  }

  return (
    <section id="journal" className="premium-panel p-5">
      <div className="flex flex-col gap-1">
        <p className="section-kicker">Local demo input</p>
        <h2 className="text-2xl font-semibold">Add Journal Note</h2>
        <p className="text-sm leading-6 text-muted">
          Add a temporary note and run the local rule-based extractor immediately.
          This does not change the synthetic dataset.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Date
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="input-surface h-11 px-3 font-mono text-sm"
            />
          </label>

          <label className="input-surface flex items-center gap-3 p-3 text-sm font-medium">
            <input
              type="checkbox"
              checked={injectionDay}
              onChange={(event) => setInjectionDay(event.target.checked)}
              className="h-4 w-4 accent-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            Mark as injection day
          </label>

          <button
            type="submit"
            className="interactive-lift h-11 rounded-lg bg-accent px-4 text-sm font-semibold text-white transition hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Extract Signals
          </button>
        </div>

        <label className="flex flex-col gap-2 text-sm font-medium">
          Journal note
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={8}
            className="input-surface min-h-44 resize-y p-3 text-sm leading-6"
            placeholder="Example: 8:30pm - felt nauseous after injection, tired, low appetite."
          />
        </label>
      </form>

      <div className="mt-5 soft-card p-4">
        <h3 className="text-base font-semibold">Latest Extraction Result</h3>
        {latestEntry ? (
          <div className="mt-3 flex flex-col gap-3">
            <div className="soft-card bg-panel p-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-muted">{latestEntry.date}</span>
                {latestEntry.injectionDay ? (
                  <span className="chip">
                    Injection
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-6">{latestEntry.rawJournalNote}</p>
            </div>

            {latestSignals.length > 0 ? (
              <div className="grid gap-3 lg:grid-cols-2">
                {latestSignals.map((signal) => (
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
              <p className="soft-card bg-panel p-3 text-sm text-muted">
                No tracked symptom detected in this note.
              </p>
            )}
          </div>
        ) : (
          <p className="mt-3 soft-card bg-panel p-3 text-sm text-muted">
            Submit a note to preview extracted signals.
          </p>
        )}
      </div>
    </section>
  );
}
