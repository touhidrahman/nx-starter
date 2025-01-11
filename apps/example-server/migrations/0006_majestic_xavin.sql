CREATE TYPE "public"."planRenewal" AS ENUM('auto', 'manually');--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "transaction_id" text;