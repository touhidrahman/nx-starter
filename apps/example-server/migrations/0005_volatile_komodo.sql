ALTER TABLE "plan" ALTER COLUMN "currency" SET DEFAULT 'BDT';--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "payment_method" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE no action ON UPDATE no action;