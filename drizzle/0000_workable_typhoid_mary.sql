CREATE TABLE "clinical_signals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"entry_id" uuid NOT NULL,
	"normalized_symptom" text NOT NULL,
	"assertion_status" text NOT NULL,
	"severity" text NOT NULL,
	"extractor_version" text NOT NULL,
	"payload" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "extraction_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"entry_id" uuid NOT NULL,
	"extractor_version" text NOT NULL,
	"source_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "extraction_run_entry_unique" UNIQUE("entry_id")
);
--> statement-breakpoint
CREATE TABLE "idempotency_records" (
	"workspace_id" uuid NOT NULL,
	"client_request_id" uuid NOT NULL,
	"payload_hash" text NOT NULL,
	"entry_id" uuid NOT NULL,
	CONSTRAINT "idempotency_workspace_key_unique" UNIQUE("workspace_id","client_request_id")
);
--> statement-breakpoint
CREATE TABLE "journal_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"patient_id" uuid NOT NULL,
	"source_id" text,
	"entry_date" date NOT NULL,
	"raw_note" text NOT NULL,
	"injection_day" integer DEFAULT 0 NOT NULL,
	"dose_change_day" integer DEFAULT 0 NOT NULL,
	"self_rated_severity" integer DEFAULT 0 NOT NULL,
	"source_type" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "entries_workspace_id_unique" UNIQUE("workspace_id","id")
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"source_id" text NOT NULL,
	"display_name" text NOT NULL,
	"profile" jsonb NOT NULL,
	"revision" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "patients_workspace_source_unique" UNIQUE("workspace_id","source_id"),
	CONSTRAINT "patients_workspace_id_unique" UNIQUE("workspace_id","id")
);
--> statement-breakpoint
CREATE TABLE "report_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"patient_id" uuid NOT NULL,
	"revision" integer NOT NULL,
	"window_end" date NOT NULL,
	"generator_version" text NOT NULL,
	"source_ids" jsonb NOT NULL,
	"report" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "report_revision_unique" UNIQUE("patient_id","revision","window_end","generator_version")
);
--> statement-breakpoint
CREATE TABLE "wearable_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"patient_id" uuid NOT NULL,
	"metric_date" date NOT NULL,
	"weight_lb_tenths" integer,
	"resting_heart_rate" integer,
	"sleep_hours_tenths" integer,
	"steps" integer,
	"active_minutes" integer,
	"strength_training_minutes" integer,
	CONSTRAINT "wearables_patient_date_unique" UNIQUE("patient_id","metric_date")
);
--> statement-breakpoint
CREATE TABLE "demo_workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token_hash" text NOT NULL,
	"seed_version" text NOT NULL,
	"seed_checksum" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "demo_workspaces_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
ALTER TABLE "clinical_signals" ADD CONSTRAINT "clinical_signals_workspace_id_demo_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."demo_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clinical_signals" ADD CONSTRAINT "clinical_signals_workspace_id_entry_id_journal_entries_workspace_id_id_fk" FOREIGN KEY ("workspace_id","entry_id") REFERENCES "public"."journal_entries"("workspace_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "extraction_runs" ADD CONSTRAINT "extraction_runs_workspace_id_demo_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."demo_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "extraction_runs" ADD CONSTRAINT "extraction_runs_workspace_id_entry_id_journal_entries_workspace_id_id_fk" FOREIGN KEY ("workspace_id","entry_id") REFERENCES "public"."journal_entries"("workspace_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idempotency_records" ADD CONSTRAINT "idempotency_records_workspace_id_demo_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."demo_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idempotency_records" ADD CONSTRAINT "idempotency_records_workspace_id_entry_id_journal_entries_workspace_id_id_fk" FOREIGN KEY ("workspace_id","entry_id") REFERENCES "public"."journal_entries"("workspace_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_workspace_id_demo_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."demo_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_workspace_id_patient_id_patients_workspace_id_id_fk" FOREIGN KEY ("workspace_id","patient_id") REFERENCES "public"."patients"("workspace_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_workspace_id_demo_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."demo_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_snapshots" ADD CONSTRAINT "report_snapshots_workspace_id_demo_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."demo_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_snapshots" ADD CONSTRAINT "report_snapshots_workspace_id_patient_id_patients_workspace_id_id_fk" FOREIGN KEY ("workspace_id","patient_id") REFERENCES "public"."patients"("workspace_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wearable_metrics" ADD CONSTRAINT "wearable_metrics_workspace_id_demo_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."demo_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wearable_metrics" ADD CONSTRAINT "wearable_metrics_workspace_id_patient_id_patients_workspace_id_id_fk" FOREIGN KEY ("workspace_id","patient_id") REFERENCES "public"."patients"("workspace_id","id") ON DELETE cascade ON UPDATE no action;