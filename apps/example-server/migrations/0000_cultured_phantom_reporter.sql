CREATE TYPE "public"."fileType" AS ENUM('image', 'document', 'video', 'audio');--> statement-breakpoint
CREATE TYPE "public"."groupLevel" AS ENUM('trial', 'basic', 'premium');--> statement-breakpoint
CREATE TYPE "public"."groupStatus" AS ENUM('active', 'inactive', 'pending');--> statement-breakpoint
CREATE TYPE "public"."groupType" AS ENUM('client', 'vendor');--> statement-breakpoint
CREATE TYPE "public"."invoiceStatus" AS ENUM('unpaid', 'partially_paid', 'fully_paid', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."show_me_as" AS ENUM('Busy', 'Available');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('Active', 'Disabled');--> statement-breakpoint
CREATE TYPE "public"."taskStatus" AS ENUM('pending', 'in_progress', 'completed', 'overdue');--> statement-breakpoint
CREATE TYPE "public"."userLevel" AS ENUM('user', 'moderator', 'admin');--> statement-breakpoint
CREATE TYPE "public"."userRole" AS ENUM('admin', 'manager', 'member');--> statement-breakpoint
CREATE TYPE "public"."userStatus" AS ENUM('active', 'inactive', 'banned');--> statement-breakpoint
CREATE TABLE "application_areas" (
	"id" text PRIMARY KEY NOT NULL,
	"area" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" text PRIMARY KEY NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"vendor_user_id" text NOT NULL,
	"client_user_id" text NOT NULL,
	"start_timestamp" timestamp with time zone NOT NULL,
	"end_timestamp" timestamp with time zone NOT NULL,
	"description" text,
	"notes_for_vendor" text,
	"notes_for_client" text,
	"group_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing" (
	"id" text PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cases" (
	"id" text PRIMARY KEY NOT NULL,
	"number" text NOT NULL,
	"name" text NOT NULL,
	"defendant" text NOT NULL,
	"plaintiff_name" text NOT NULL,
	"plaintiff_group_id" text NOT NULL,
	"group_id" text NOT NULL,
	"court" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courts" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "document_sharing" (
	"id" text PRIMARY KEY NOT NULL,
	"sender_group_id" text NOT NULL,
	"receiver_group_id" text NOT NULL,
	"document_id" text NOT NULL,
	"sender_user_id" text NOT NULL,
	"receiver_user_id" text,
	"expiry_date" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" text PRIMARY KEY NOT NULL,
	"filename" text NOT NULL,
	"url" text NOT NULL,
	"extension" text NOT NULL,
	"mimetype" text NOT NULL,
	"type" "fileType" NOT NULL,
	"size" integer NOT NULL,
	"folder" text,
	"description" text,
	"group_id" text NOT NULL,
	"user_id" text,
	"entity_id" text,
	"entity_name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" text PRIMARY KEY NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"user_id" text NOT NULL,
	"start_timestamp" timestamp with time zone NOT NULL,
	"end_timestamp" timestamp with time zone NOT NULL,
	"description" text,
	"show_me_as" "show_me_as" NOT NULL,
	"whole_day" boolean NOT NULL,
	"group_id" text NOT NULL,
	"status" "status" NOT NULL,
	"case_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" text PRIMARY KEY NOT NULL,
	"type" "groupType" DEFAULT 'client' NOT NULL,
	"status" "groupStatus" DEFAULT 'pending' NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"address" text,
	"city" text,
	"state" text,
	"country" text,
	"post_code" text,
	"owner_id" text NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"verified_on" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invites" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"group_id" text NOT NULL,
	"role" "userRole" DEFAULT 'member' NOT NULL,
	"invited_by" text NOT NULL,
	"invited_on" timestamp with time zone DEFAULT now() NOT NULL,
	"accepted_on" timestamp with time zone,
	"status" text DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice_items" (
	"id" text PRIMARY KEY NOT NULL,
	"invoice_id" text NOT NULL,
	"service_code" text NOT NULL,
	"service_rendered" text NOT NULL,
	"unit_price" numeric NOT NULL,
	"qty" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" text PRIMARY KEY NOT NULL,
	"invoice_code" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"due_date" timestamp with time zone NOT NULL,
	"status" "invoiceStatus" DEFAULT 'unpaid' NOT NULL,
	"total_due_amount" numeric NOT NULL,
	"remaining_due_amount" numeric NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "invoices_invoice_code_unique" UNIQUE("invoice_code")
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" text PRIMARY KEY NOT NULL,
	"vendor_user_id" text NOT NULL,
	"client_user_id" text NOT NULL,
	"readable_by_vendor_group" boolean DEFAULT false NOT NULL,
	"readable_by_client_group" boolean DEFAULT false NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"reply_by_date" date,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" text PRIMARY KEY NOT NULL,
	"invoice_id" text NOT NULL,
	"amount_paid" integer NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"is_fully_paid" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"group_id" text NOT NULL,
	"role" "userRole" NOT NULL,
	"area" text NOT NULL,
	"access" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "permissions_group_id_role_area_pk" PRIMARY KEY("group_id","role","area")
);
--> statement-breakpoint
CREATE TABLE "storage" (
	"id" text PRIMARY KEY NOT NULL,
	"filename" text,
	"url" text,
	"type" "fileType" DEFAULT 'document',
	"extension" text,
	"size" integer DEFAULT 0,
	"uploaded_by" text,
	"entity_id" text,
	"entity_name" text,
	"expiry_date" timestamp,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" text PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"plan_id" text NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"todo" text NOT NULL,
	"assigned_user_id" text,
	"assigned_role" "userRole",
	"due_date" timestamp with time zone NOT NULL,
	"status" "taskStatus" DEFAULT 'pending' NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_groups" (
	"user_id" text NOT NULL,
	"group_id" text NOT NULL,
	"role" "userRole" NOT NULL,
	CONSTRAINT "users_groups_user_id_group_id_pk" PRIMARY KEY("user_id","group_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"cover_photo" text,
	"profile_photo" text,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"phone" text,
	"address" text,
	"city" text,
	"state" text,
	"country" text,
	"post_code" text,
	"url" text,
	"bio" text,
	"last_login" timestamp with time zone,
	"level" "userLevel" DEFAULT 'user' NOT NULL,
	"status" "userStatus" DEFAULT 'active' NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"default_group_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_vendor_user_id_users_id_fk" FOREIGN KEY ("vendor_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_user_id_users_id_fk" FOREIGN KEY ("client_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cases" ADD CONSTRAINT "cases_plaintiff_group_id_groups_id_fk" FOREIGN KEY ("plaintiff_group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cases" ADD CONSTRAINT "cases_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_sharing" ADD CONSTRAINT "document_sharing_sender_group_id_groups_id_fk" FOREIGN KEY ("sender_group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_sharing" ADD CONSTRAINT "document_sharing_receiver_group_id_groups_id_fk" FOREIGN KEY ("receiver_group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_sharing" ADD CONSTRAINT "document_sharing_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_sharing" ADD CONSTRAINT "document_sharing_sender_user_id_users_id_fk" FOREIGN KEY ("sender_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_sharing" ADD CONSTRAINT "document_sharing_receiver_user_id_users_id_fk" FOREIGN KEY ("receiver_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_vendor_user_id_users_id_fk" FOREIGN KEY ("vendor_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_client_user_id_users_id_fk" FOREIGN KEY ("client_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assigned_user_id_users_id_fk" FOREIGN KEY ("assigned_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "emailUniqueIndex" ON "users" USING btree (lower("email"));