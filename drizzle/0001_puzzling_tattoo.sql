ALTER TABLE "dim_items" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "dim_clients" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "fact_link_requests" ALTER COLUMN "created_at" SET DEFAULT now();