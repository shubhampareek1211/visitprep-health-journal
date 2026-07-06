import type { SymptomCategory } from "@/types/health";

export type SymptomDefinition = {
  name: string;
  category: SymptomCategory;
  aliases: Array<string | WeightedAlias>;
};

export type WeightedAlias = {
  term: string;
  weight: number;
};

export const symptomDictionary: SymptomDefinition[] = [
  {
    name: "nausea",
    category: "gi",
    aliases: [
      "nauseous",
      "nausea",
      "queasy",
      "sick to my stomach",
      { term: "stomach turned", weight: 0.74 }
    ]
  },
  {
    name: "vomiting",
    category: "gi",
    aliases: ["vomited", "vomiting", "threw up", "throwing up", "couldn't keep food down"]
  },
  {
    name: "diarrhea",
    category: "gi",
    aliases: ["diarrhea", "loose stool", "loose stools", "bathroom trips"]
  },
  {
    name: "constipation",
    category: "gi",
    aliases: ["constipated", "constipation", "hard to go"]
  },
  {
    name: "abdominal discomfort",
    category: "gi",
    aliases: [
      "stomach cramps",
      "stomach pain",
      "stomach pressure",
      "abdominal discomfort",
      "belly pain"
    ]
  },
  {
    name: "bloating",
    category: "gi",
    aliases: ["bloated", "bloating", "gassy"]
  },
  {
    name: "low appetite",
    category: "appetite",
    aliases: [
      "low appetite",
      "little appetite",
      "no appetite",
      "not hungry",
      "ate very little",
      "food sounded gross",
      "dinner looked unappealing"
    ]
  },
  {
    name: "fatigue",
    category: "energy",
    aliases: ["tired", "fatigue", "exhausted", "wiped out", "no energy", "heavy body feeling"]
  },
  {
    name: "dizziness",
    category: "cardio",
    aliases: ["dizzy", "dizziness", "lightheaded"]
  },
  {
    name: "headache",
    category: "other",
    aliases: ["headache", "head hurt", "head pounding"]
  },
  {
    name: "poor sleep",
    category: "sleep",
    aliases: [
      "poor sleep",
      "sleep broken",
      { term: "woke up a few times", weight: 0.86 },
      { term: "woke up repeatedly", weight: 0.86 },
      { term: "woke up multiple times", weight: 0.86 },
      "couldn't sleep",
      "slept poorly"
    ]
  },
  {
    name: "anxiety",
    category: "mood",
    aliases: ["anxiety", "anxious"]
  },
  {
    name: "muscle weakness",
    category: "energy",
    aliases: ["muscle weakness", "legs felt weak", "felt weak during workout"]
  },
  {
    name: "heart racing",
    category: "cardio",
    aliases: ["heart racing", "heart felt like it was racing", "racing heart"]
  }
];
