ALTER TABLE "storage" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "storage" ADD COLUMN "updated_at" timestamp with time zone NOT NULL;