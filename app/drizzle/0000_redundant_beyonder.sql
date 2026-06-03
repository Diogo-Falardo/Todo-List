CREATE TABLE "guests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"date_start" date NOT NULL,
	"date_end" date NOT NULL,
	"notes" text,
	"platform" text NOT NULL,
	"total" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "maintenance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"money_want_to_spend" numeric(10, 2),
	"actual_cost" numeric(10, 2),
	"days_to_complete" numeric(5, 0)
);
