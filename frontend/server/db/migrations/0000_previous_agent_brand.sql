CREATE TABLE "disaster_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"what_happened" text NOT NULL,
	"location" varchar(255) NOT NULL,
	"latitude" numeric(10, 8),
	"longitude" numeric(11, 8),
	"severity" varchar(50) NOT NULL,
	"occurred_at" timestamp NOT NULL,
	"status" varchar(50) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rescue_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"location" varchar(255) NOT NULL,
	"latitude" numeric(10, 8),
	"longitude" numeric(11, 8),
	"urgency" varchar(50) NOT NULL,
	"people_count" integer DEFAULT 1,
	"status" varchar(50) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "resource_allocations" (
	"id" serial PRIMARY KEY NOT NULL,
	"request_id" integer,
	"resource_id" integer,
	"quantity" integer NOT NULL,
	"allocated_by" integer,
	"allocated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "resources" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(100) NOT NULL,
	"quantity" integer NOT NULL,
	"warehouse_id" integer,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'survivor' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "warehouses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"location" varchar(255) NOT NULL,
	"latitude" numeric(10, 8),
	"longitude" numeric(11, 8),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "disaster_reports" ADD CONSTRAINT "disaster_reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rescue_requests" ADD CONSTRAINT "rescue_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_allocations" ADD CONSTRAINT "resource_allocations_request_id_rescue_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."rescue_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_allocations" ADD CONSTRAINT "resource_allocations_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_allocations" ADD CONSTRAINT "resource_allocations_allocated_by_users_id_fk" FOREIGN KEY ("allocated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;