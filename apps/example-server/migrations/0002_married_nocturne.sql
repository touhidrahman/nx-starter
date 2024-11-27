CREATE TYPE "public"."fileType" AS ENUM('image', 'document', 'video', 'audio');--> statement-breakpoint
ALTER TABLE "storage" ADD COLUMN "type" "fileType" DEFAULT 'document';