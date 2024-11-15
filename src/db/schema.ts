import { pgTable, foreignKey, serial, varchar, integer, timestamp, text, jsonb } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const dimItems = pgTable("dim_items", {
	id: serial().primaryKey().notNull(),
	plaidId: varchar("plaid_id").unique().notNull(),
	accessToken: varchar("access_token"),
	clientId: integer("client_id").notNull(),
	itemStatusId: integer("item_status_id").default(1).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => {
	return {
		dimItemsClientIdDimClientsIdFk: foreignKey({
			columns: [table.clientId],
			foreignColumns: [dimClients.id],
			name: "dim_items_client_id_dim_clients_id_fk"
		}),
		dimItemsItemStatusIdDimItemStatusIdFk: foreignKey({
			columns: [table.itemStatusId],
			foreignColumns: [dimItemStatus.id],
			name: "dim_items_item_status_id_dim_item_status_id_fk"
		}),
	}
});

export const dimAccounts = pgTable("dim_accounts", {
	id: serial().primaryKey().notNull(),
	plaidId: varchar("plaid_id").unique().notNull(),
	itemId: integer("item_id").notNull(),
	institutionId: integer("institution_id").notNull(),
	name: varchar().notNull(),
	type: varchar(),
	subtype: varchar(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => {
	return {
		dimAccountsItemIdDimItemsIdFk: foreignKey({
			columns: [table.itemId],
			foreignColumns: [dimItems.id],
			name: "dim_accounts_item_id_dim_items_id_fk"
		}),
		dimAccountsInstitutionIdDimInstitutionsIdFk: foreignKey({
			columns: [table.institutionId],
			foreignColumns: [dimInstitutions.id],
			name: "dim_accounts_institution_id_dim_institutions_id_fk"
		}),
	}
});

export const dimInstitutions = pgTable("dim_institutions", {
	id: serial().primaryKey().notNull(),
	plaidId: varchar("plaid_id").unique().notNull(),
	name: varchar().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const dimClients = pgTable("dim_clients", {
	id: serial().primaryKey().notNull(),
	taxdomeId: varchar("taxdome_id").unique().notNull(),
	companyName: varchar("company_name").notNull(),
	emailAddress: varchar("email_address").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const dimItemStatus = pgTable("dim_item_status", {
	id: serial().primaryKey().notNull(),
	status: varchar(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const factLinkRequests = pgTable("fact_link_requests", {
	id: serial().primaryKey().notNull(),
	linkToken: varchar("link_token").unique().notNull(),
	clientId: integer("client_id").notNull(),
	requestId: varchar("request_id").notNull(),
	requestStatusId: integer("request_status_id").default(1).notNull(),
	expiration: timestamp({ mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	completedAt: timestamp("completed_at", { mode: 'string' }),
	errorMessage: text("error_message"),
}, (table) => {
	return {
		factLinkRequestsClientIdDimClientsIdFk: foreignKey({
			columns: [table.clientId],
			foreignColumns: [dimClients.id],
			name: "fact_link_requests_client_id_dim_clients_id_fk"
		}),
		factLinkRequestsRequestStatusIdDimRequestStatusIdFk: foreignKey({
			columns: [table.requestStatusId],
			foreignColumns: [dimRequestStatus.id],
			name: "fact_link_requests_request_status_id_dim_request_status_id_fk"
		}),
	}
});

export const dimRequestStatus = pgTable("dim_request_status", {
	id: serial().primaryKey().notNull(),
	status: varchar(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const factReportRequests = pgTable("fact_report_requests", {
	id: serial().primaryKey().notNull(),
	plaidId: varchar("plaid_id").unique().notNull(),
	clientId: integer("client_id").notNull(),
	requestStatusId: integer("request_status_id").default(1).notNull(),
	token: varchar().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	completedAt: timestamp("completed_at", { mode: 'string' }),
	month: varchar({ length: 3 }).notNull(),
	year: varchar({ length: 4 }).notNull(),
	data: jsonb(),
}, (table) => {
	return {
		factReportRequestsClientIdDimClientsIdFk: foreignKey({
			columns: [table.clientId],
			foreignColumns: [dimClients.id],
			name: "fact_report_requests_client_id_dim_clients_id_fk"
		}),
		factReportRequestsRequestStatusIdDimRequestStatusIdFk: foreignKey({
			columns: [table.requestStatusId],
			foreignColumns: [dimRequestStatus.id],
			name: "fact_report_requests_request_status_id_dim_request_status_id_fk"
		}),
	}
});
