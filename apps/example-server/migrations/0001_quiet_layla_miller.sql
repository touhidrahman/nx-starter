ALTER TABLE "documents" ADD COLUMN "extension" text NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "type" "fileType" NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "folder" text;