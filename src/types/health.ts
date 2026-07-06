export type SymptomCategory =
  | "gi"
  | "energy"
  | "mood"
  | "cardio"
  | "sleep"
  | "appetite"
  | "other";

export type SymptomSeverity = "none" | "mild" | "moderate" | "severe" | "unknown";

export type ClinicalAssertionStatus =
  | "present"
  | "absent"
  | "uncertain"
  | "resolved";

export type AnnotatedSymptom = {
  name: string;
  category: SymptomCategory;
  severity: SymptomSeverity;
};

export type ExtractedClinicalSignal = {
  entryId: string;
  date: string;
  symptom: string;
  normalizedSymptom: string;
  category: SymptomCategory;
  severity: SymptomSeverity;
  evidenceText: string;
  matchedText: string;
  evidenceStart: number;
  evidenceEnd: number;
  assertionStatus: ClinicalAssertionStatus;
  temporalContext: string[];
  severityReason: string;
  confidence: number;
  relatedToInjection: boolean;
  relatedToInjectionReason: string;
  extractionMethod: "rule-based" | "semantic-local" | "hybrid";
};

export type CountByName = {
  name: string;
  count: number;
};

export type SeverityDistribution = {
  none: number;
  mild: number;
  moderate: number;
  severe: number;
  unknown: number;
};

export type MetricTrend = {
  firstValue: number;
  lastValue: number;
  change: number;
  firstWeekAverage: number;
  lastWeekAverage: number;
  averageChange: number;
};

export type WearableTrendSummary = {
  weightLb: MetricTrend;
  sleepHours: MetricTrend;
  steps: MetricTrend;
  restingHeartRate: MetricTrend;
  activeMinutes: MetricTrend;
  strengthTrainingMinutes: MetricTrend;
};

export type PatientAnalyticsSummary = {
  patientId: string;
  entryCount: number;
  signalCount: number;
  symptomFrequency: CountByName[];
  categoryFrequency: CountByName[];
  topSymptoms: CountByName[];
  injectionAdjacentSymptomFrequency: CountByName[];
  injectionAdjacentSignalCount: number;
  severityDistribution: SeverityDistribution;
  wearableTrends: WearableTrendSummary;
};

export type ReportEvidenceNote = {
  day: number;
  date: string;
  note: string;
  symptoms: string[];
  injectionDay: boolean;
  doseChangeDay: boolean;
};

export type DoctorReport = {
  patientId: string;
  patientLabel: string;
  dateRange: string;
  syntheticDataNotice: string;
  snapshot: string[];
  medicationContext: string[];
  symptomHighlights: CountByName[];
  wearableHighlights: string[];
  evidenceNotes: ReportEvidenceNote[];
  discussionPrompts: string[];
  safetyDisclaimer: string;
};

export type WearableMetrics = {
  weightLb: number;
  restingHeartRate: number;
  sleepHours: number;
  steps: number;
  activeMinutes: number;
  strengthTrainingMinutes: number;
};

export type JournalEntry = {
  day: number;
  date: string;
  rawJournalNote: string;
  injectionDay: boolean;
  doseChangeDay: boolean;
  selfRatedSeverity: number;
  annotatedSymptoms: AnnotatedSymptom[];
  wearableMetrics: WearableMetrics;
};

export type SyntheticPatientProfile = {
  ageRange: string;
  context: string;
  dataType: string;
};

export type ThirtyDaySummary = {
  topReportedSymptoms: [string, number][];
  moderateSymptomDays: number;
  injectionDays: number[];
  doseChangeDays: number[];
  weightChangeLb: number;
  avgSleepFirstWeek: number;
  avgSleepLastWeek: number;
  avgStepsFirstWeek: number;
  avgStepsLastWeek: number;
  doctorDiscussionPrompts: string[];
};

export type SyntheticPatient = {
  id: string;
  displayName: string;
  syntheticPatientProfile: SyntheticPatientProfile;
  journalEntries: JournalEntry[];
  thirtyDaySummary: ThirtyDaySummary;
};

export type SourceReference = {
  title: string;
  url: string;
};

export type SyntheticDataset = {
  metadata: {
    datasetName: string;
    version: string;
    generatedOn: string;
    syntheticDataNotice: string;
    clinicalBasis: string[];
    sourceReferences: SourceReference[];
  };
  patients: SyntheticPatient[];
};
