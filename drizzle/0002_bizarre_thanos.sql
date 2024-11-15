ALTER TABLE "dim_request_status" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "dim_request_status" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dim_request_status" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "dim_request_status" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dim_item_status" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "dim_item_status" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "dim_accounts" ADD CONSTRAINT "dim_accounts_plaid_id_unique" UNIQUE("plaid_id");--> statement-breakpoint
ALTER TABLE "dim_clients" ADD CONSTRAINT "dim_clients_taxdome_id_unique" UNIQUE("taxdome_id");--> statement-breakpoint
ALTER TABLE "dim_institutions" ADD CONSTRAINT "dim_institutions_plaid_id_unique" UNIQUE("plaid_id");--> statement-breakpoint
ALTER TABLE "dim_items" ADD CONSTRAINT "dim_items_plaid_id_unique" UNIQUE("plaid_id");