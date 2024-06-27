CREATE TABLE IF NOT EXISTS "vendors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"address" text,
	"city" text,
	"country" text,
	"post_code" text,
	"is_verified" boolean DEFAULT false NOT NULL,
	"verified_on" timestamp,
	"is_trialing" boolean DEFAULT true NOT NULL,
	"next_billing_date" timestamp,
	"next_renewal_date" timestamp,
	"subscription" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
