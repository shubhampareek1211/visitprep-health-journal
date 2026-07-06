#!/usr/bin/env python3
"""Generate synthetic GLP-1 patient journal data for the MVP.

The generated data is fictional and intended only for product prototyping,
NLP extraction tests, and demo visualization. It is not medical advice and
does not represent real patients.
"""

from __future__ import annotations

import json
from collections import Counter
from datetime import date, timedelta
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "data" / "synthetic"
JSON_OUT = OUT_DIR / "glp1_patient_journals.json"
MD_OUT = OUT_DIR / "doctor_visit_summaries.md"


SYMPTOM_CATEGORY = {
    "nausea": "gi",
    "vomiting": "gi",
    "diarrhea": "gi",
    "constipation": "gi",
    "abdominal discomfort": "gi",
    "bloating": "gi",
    "low appetite": "appetite",
    "fatigue": "energy",
    "dizziness": "cardio",
    "headache": "other",
    "poor sleep": "sleep",
    "anxiety": "mood",
    "muscle weakness": "energy",
    "heart racing": "cardio",
}


PATIENTS = [
    {
        "id": "syn-p001",
        "displayName": "Patient A",
        "ageRange": "30-39",
        "context": "New GLP-1 start, weekly injection on Mondays, trying to keep strength training consistent.",
        "startWeight": 214.6,
        "baseRhr": 74,
        "baseSleep": 6.8,
        "baseSteps": 6800,
        "pattern": "nausea_appetite_constipation",
        "injectionDays": [1, 8, 15, 22, 29],
        "doseChangeDays": [15],
    },
    {
        "id": "syn-p002",
        "displayName": "Patient B",
        "ageRange": "40-49",
        "context": "Dose escalation during the month, history of reflux-like stomach discomfort.",
        "startWeight": 189.2,
        "baseRhr": 69,
        "baseSleep": 7.2,
        "baseSteps": 7900,
        "pattern": "vomiting_diarrhea_fatigue",
        "injectionDays": [3, 10, 17, 24],
        "doseChangeDays": [17],
    },
    {
        "id": "syn-p003",
        "displayName": "Patient C",
        "ageRange": "50-59",
        "context": "Tracking blood pressure concerns, anxiety, sleep, and appetite while on weekly injection.",
        "startWeight": 231.0,
        "baseRhr": 78,
        "baseSleep": 6.3,
        "baseSteps": 5200,
        "pattern": "anxiety_sleep_dizziness",
        "injectionDays": [2, 9, 16, 23, 30],
        "doseChangeDays": [],
    },
    {
        "id": "syn-p004",
        "displayName": "Patient D",
        "ageRange": "25-34",
        "context": "Very active baseline, concerned about appetite suppression and possible muscle loss.",
        "startWeight": 176.8,
        "baseRhr": 63,
        "baseSleep": 7.6,
        "baseSteps": 10400,
        "pattern": "low_appetite_strength_drop",
        "injectionDays": [1, 8, 15, 22, 29],
        "doseChangeDays": [22],
    },
    {
        "id": "syn-p005",
        "displayName": "Patient E",
        "ageRange": "60-69",
        "context": "Older adult tracking constipation, hydration, dizziness, and lower activity during treatment.",
        "startWeight": 203.4,
        "baseRhr": 72,
        "baseSleep": 6.9,
        "baseSteps": 6100,
        "pattern": "constipation_dizziness_headache",
        "injectionDays": [4, 11, 18, 25],
        "doseChangeDays": [],
    },
]


def symptoms_for_day(pattern: str, day: int, injection_days: list[int]) -> list[str]:
    near_injection = any(0 <= day - inj <= 2 for inj in injection_days)

    if pattern == "nausea_appetite_constipation":
        if near_injection and day % 2 == 0:
            return ["nausea", "low appetite"]
        if day in [5, 6, 12, 19, 20, 27]:
            return ["constipation", "bloating"]
        if day in [16, 17]:
            return ["nausea", "fatigue", "low appetite"]
    if pattern == "vomiting_diarrhea_fatigue":
        if day in [4, 18]:
            return ["vomiting", "nausea", "fatigue"]
        if day in [5, 11, 19, 20, 25]:
            return ["diarrhea", "abdominal discomfort"]
        if near_injection:
            return ["nausea", "fatigue"]
    if pattern == "anxiety_sleep_dizziness":
        if day in [2, 3, 9, 16, 23]:
            return ["anxiety", "poor sleep", "heart racing"]
        if day in [4, 10, 17, 24, 30]:
            return ["dizziness", "headache"]
        if day in [13, 14, 21]:
            return ["poor sleep", "fatigue"]
    if pattern == "low_appetite_strength_drop":
        if near_injection:
            return ["low appetite", "nausea"]
        if day in [7, 14, 21, 26, 27, 28]:
            return ["fatigue", "muscle weakness"]
        if day in [23, 24]:
            return ["low appetite", "fatigue", "muscle weakness"]
    if pattern == "constipation_dizziness_headache":
        if day in [6, 7, 12, 13, 19, 20, 26, 27]:
            return ["constipation", "abdominal discomfort"]
        if near_injection and day % 2 == 1:
            return ["dizziness", "headache"]
        if day in [15, 22, 29]:
            return ["fatigue", "poor sleep"]
    return []


def severity_for(symptoms: list[str], day: int, dose_change_days: list[int]) -> str:
    if not symptoms:
        return "none"
    if any(abs(day - d) <= 2 for d in dose_change_days):
        return "moderate"
    if "vomiting" in symptoms or len(symptoms) >= 3:
        return "moderate"
    if day % 9 == 0:
        return "moderate"
    return "mild"


def note_for_day(patient: dict, day: int, current_date: date, symptoms: list[str], severity: str) -> str:
    time_by_day = ["7:20am", "9:10pm", "2:35pm", "6:45am", "8:05pm", "11:30am"]
    t = time_by_day[(day + len(patient["id"])) % len(time_by_day)]
    injection = day in patient["injectionDays"]
    dose_change = day in patient["doseChangeDays"]

    prefix = f"{current_date.isoformat()} {t} - "
    if not symptoms:
        quiet = [
            "pretty normal day. ate smaller portions but no big symptoms. walked after dinner.",
            "no major side effects today. appetite still lower than before, but manageable.",
            "energy ok. wrote this down because I actually felt steady today.",
            "nothing dramatic. stomach fine. slept okay-ish, still watching hydration.",
            "felt mostly like myself. had protein with lunch and kept water bottle nearby.",
        ]
        return prefix + quiet[day % len(quiet)]

    parts = []
    if injection:
        parts.append("shot day")
        if dose_change:
            parts.append("higher dose this week")
    elif any(0 <= day - inj <= 2 for inj in patient["injectionDays"]):
        parts.append("day after/near shot")

    symptom_text = {
        "nausea": "nauseous, kind of waves not constant",
        "vomiting": "vomited once, then felt wiped out",
        "diarrhea": "loose stool/diarrhea, stayed close to bathroom",
        "constipation": "constipated, uncomfortable and slow",
        "abdominal discomfort": "stomach cramps / pressure",
        "bloating": "bloated after small meal",
        "low appetite": "low appetite, dinner looked unappealing",
        "fatigue": "tired, heavy body feeling",
        "dizziness": "lightheaded when standing up",
        "headache": "dull headache",
        "poor sleep": "sleep broken, woke up a few times",
        "anxiety": "anxiety spike, especially later in day",
        "muscle weakness": "legs felt weak during workout",
        "heart racing": "heart felt like it was racing for a bit",
    }
    parts.extend(symptom_text[s] for s in symptoms)

    if severity == "moderate":
        parts.append("not awful but enough that I want to mention it")
    else:
        parts.append("mild, tracking it")

    endings = [
        "sipped water slowly",
        "ate plain toast / small protein",
        "skipped heavier meal",
        "walk was shorter than usual",
        "will see if this repeats tomorrow",
    ]
    parts.append(endings[(day + len(symptoms)) % len(endings)])
    return prefix + ". ".join(parts) + "."


def metric_for_day(patient: dict, day: int, symptoms: list[str], severity: str) -> dict:
    weight_drop = 0.18 * (day - 1)
    if patient["pattern"] == "low_appetite_strength_drop":
        weight_drop += 0.03 * max(0, day - 18)
    if patient["pattern"] == "vomiting_diarrhea_fatigue":
        weight_drop += 0.02 * max(0, day - 15)

    rhr = patient["baseRhr"] + (2 if "heart racing" in symptoms else 0) + (1 if "poor sleep" in symptoms else 0)
    sleep = patient["baseSleep"] - (0.9 if "poor sleep" in symptoms else 0) - (0.3 if severity == "moderate" else 0)
    steps = patient["baseSteps"] - (1300 if "fatigue" in symptoms else 0) - (900 if "dizziness" in symptoms else 0)
    steps -= 600 if severity == "moderate" else 0
    active = max(8, int(steps / 210))
    strength = 25 if patient["pattern"] == "low_appetite_strength_drop" else 12
    if "muscle weakness" in symptoms or "fatigue" in symptoms:
        strength = max(0, strength - 15)
    if day % 7 in [0, 6]:
        strength = max(0, strength - 8)

    return {
        "weightLb": round(patient["startWeight"] - weight_drop, 1),
        "restingHeartRate": int(rhr),
        "sleepHours": round(max(4.8, sleep), 1),
        "steps": int(max(2400, steps + ((day % 5) - 2) * 180)),
        "activeMinutes": active,
        "strengthTrainingMinutes": int(strength),
    }


def generate() -> dict:
    start = date(2026, 5, 1)
    patients = []
    for patient in PATIENTS:
        entries = []
        symptom_counter: Counter[str] = Counter()
        severity_counter: Counter[str] = Counter()
        for day in range(1, 31):
            current_date = start + timedelta(days=day - 1)
            symptoms = symptoms_for_day(patient["pattern"], day, patient["injectionDays"])
            severity = severity_for(symptoms, day, patient["doseChangeDays"])
            symptom_counter.update(symptoms)
            severity_counter.update([severity])
            entries.append(
                {
                    "day": day,
                    "date": current_date.isoformat(),
                    "rawJournalNote": note_for_day(patient, day, current_date, symptoms, severity),
                    "injectionDay": day in patient["injectionDays"],
                    "doseChangeDay": day in patient["doseChangeDays"],
                    "selfRatedSeverity": 0 if severity == "none" else 2 if severity == "mild" else 3,
                    "annotatedSymptoms": [
                        {"name": s, "category": SYMPTOM_CATEGORY[s], "severity": severity}
                        for s in symptoms
                    ],
                    "wearableMetrics": metric_for_day(patient, day, symptoms, severity),
                }
            )

        first = entries[0]["wearableMetrics"]
        last = entries[-1]["wearableMetrics"]
        avg_sleep_first_week = sum(e["wearableMetrics"]["sleepHours"] for e in entries[:7]) / 7
        avg_sleep_last_week = sum(e["wearableMetrics"]["sleepHours"] for e in entries[-7:]) / 7
        avg_steps_first_week = sum(e["wearableMetrics"]["steps"] for e in entries[:7]) / 7
        avg_steps_last_week = sum(e["wearableMetrics"]["steps"] for e in entries[-7:]) / 7

        patients.append(
            {
                "id": patient["id"],
                "displayName": patient["displayName"],
                "syntheticPatientProfile": {
                    "ageRange": patient["ageRange"],
                    "context": patient["context"],
                    "dataType": "synthetic fictional patient-generated health journal",
                },
                "journalEntries": entries,
                "thirtyDaySummary": {
                    "topReportedSymptoms": symptom_counter.most_common(),
                    "moderateSymptomDays": severity_counter["moderate"],
                    "injectionDays": patient["injectionDays"],
                    "doseChangeDays": patient["doseChangeDays"],
                    "weightChangeLb": round(last["weightLb"] - first["weightLb"], 1),
                    "avgSleepFirstWeek": round(avg_sleep_first_week, 1),
                    "avgSleepLastWeek": round(avg_sleep_last_week, 1),
                    "avgStepsFirstWeek": int(avg_steps_first_week),
                    "avgStepsLastWeek": int(avg_steps_last_week),
                    "doctorDiscussionPrompts": discussion_prompts(symptom_counter, patient["pattern"]),
                },
            }
        )

    return {
        "metadata": {
            "datasetName": "Synthetic GLP-1 Patient Journal Dataset",
            "version": "0.1.0",
            "generatedOn": "2026-06-26",
            "syntheticDataNotice": "All patients, notes, annotations, and wearable metrics are fictional and generated for MVP prototyping. Do not use for clinical care.",
            "clinicalBasis": [
                "GLP-1 receptor agonist literature commonly reports gastrointestinal adverse events including nausea, vomiting, diarrhea, and constipation.",
                "Additional commonly discussed symptoms include appetite loss, abdominal discomfort, dizziness, headache, fatigue, and possible heart-rate changes.",
                "The dataset is designed for NLP, summarization, and visualization testing, not clinical inference.",
            ],
            "sourceReferences": [
                {
                    "title": "Clinical Recommendations to Manage Gastrointestinal Adverse Events in Patients Treated With GLP-1 Receptor Agonists",
                    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9821052/",
                },
                {
                    "title": "Gastrointestinal tolerability of once-weekly semaglutide 2.4 mg in adults with overweight or obesity",
                    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9293236/",
                },
                {
                    "title": "Semaglutide - StatPearls",
                    "url": "https://www.ncbi.nlm.nih.gov/books/NBK603723/",
                },
            ],
        },
        "patients": patients,
    }


def discussion_prompts(symptoms: Counter[str], pattern: str) -> list[str]:
    prompts = []
    if symptoms["nausea"] or symptoms["vomiting"]:
        prompts.append("Ask whether the nausea/vomiting pattern is expected at the current dose and timing.")
    if symptoms["constipation"] or symptoms["diarrhea"]:
        prompts.append("Discuss bowel changes, hydration, and whether the current symptom pattern needs management.")
    if symptoms["fatigue"] or symptoms["muscle weakness"]:
        prompts.append("Discuss energy level, protein intake, exercise tolerance, and whether strength or lean-mass monitoring is appropriate.")
    if symptoms["dizziness"] or symptoms["heart racing"]:
        prompts.append("Discuss dizziness or heart-rate symptoms, especially if they continue or worsen.")
    if pattern == "anxiety_sleep_dizziness":
        prompts.append("Review anxiety and sleep changes alongside wearable trends.")
    prompts.append("Review whether any symptoms require changes to monitoring, follow-up timing, or medication plan.")
    return prompts


def write_markdown(dataset: dict) -> str:
    lines = [
        "# Synthetic Doctor Visit Summaries",
        "",
        "All content in this file is synthetic and fictional. It is intended for MVP demonstration, NLP testing, and report prototyping only.",
        "",
    ]
    for patient in dataset["patients"]:
        summary = patient["thirtyDaySummary"]
        profile = patient["syntheticPatientProfile"]
        lines.extend(
            [
                f"## {patient['displayName']} ({patient['id']})",
                "",
                f"Profile: {profile['ageRange']}; {profile['context']}",
                "",
                "### 30-Day Summary",
                "",
                f"- Injection days: {', '.join('day ' + str(d) for d in summary['injectionDays'])}.",
                f"- Dose change days: {', '.join('day ' + str(d) for d in summary['doseChangeDays']) if summary['doseChangeDays'] else 'none noted in this synthetic record'}.",
                f"- Weight change: {summary['weightChangeLb']} lb over 30 days.",
                f"- Average sleep: {summary['avgSleepFirstWeek']} hours in week 1; {summary['avgSleepLastWeek']} hours in week 4.",
                f"- Average steps: {summary['avgStepsFirstWeek']} per day in week 1; {summary['avgStepsLastWeek']} per day in week 4.",
                f"- Moderate symptom days: {summary['moderateSymptomDays']}.",
                "",
                "Top reported symptoms:",
            ]
        )
        for symptom, count in summary["topReportedSymptoms"][:6]:
            day_label = "day" if count == 1 else "days"
            lines.append(f"- {symptom}: {count} {day_label}")
        lines.extend(["", "Representative patient notes:"])
        reps = [e for e in patient["journalEntries"] if e["annotatedSymptoms"]][:4]
        for entry in reps:
            lines.append(f"- Day {entry['day']}: \"{entry['rawJournalNote']}\"")
        lines.extend(["", "Suggested clinician discussion prompts:"])
        for prompt in summary["doctorDiscussionPrompts"]:
            lines.append(f"- {prompt}")
        lines.extend(["", "Safety note: This summary organizes patient-reported information and wearable-style data. It does not diagnose, determine causality, or recommend treatment changes.", ""])
    return "\n".join(lines)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    dataset = generate()
    JSON_OUT.write_text(json.dumps(dataset, indent=2) + "\n", encoding="utf-8")
    MD_OUT.write_text(write_markdown(dataset), encoding="utf-8")
    print(f"Wrote {JSON_OUT}")
    print(f"Wrote {MD_OUT}")


if __name__ == "__main__":
    main()
