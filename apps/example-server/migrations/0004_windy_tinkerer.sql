CREATE TABLE "plan" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"monthly_price" numeric(10, 2) NOT NULL,
	"yearly_price" numeric(10, 2),
	"discount_price" numeric(5, 2),
	"currency" text DEFAULT 'USD',
	"is_active" boolean DEFAULT true,
	"features" text[],
	"tier" text,
	"trial_period_days" integer,
	"renewal_type" text DEFAULT 'auto',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
