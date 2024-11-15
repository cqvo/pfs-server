"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factReportRequests = exports.dimRequestStatus = exports.factLinkRequests = exports.dimItemStatus = exports.dimClients = exports.dimInstitutions = exports.dimAccounts = exports.dimItems = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.dimItems = (0, pg_core_1.pgTable)("dim_items", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    plaidId: (0, pg_core_1.varchar)("plaid_id").notNull(),
    accessToken: (0, pg_core_1.varchar)("access_token"),
    clientId: (0, pg_core_1.integer)("client_id").notNull(),
    itemStatusId: (0, pg_core_1.integer)("item_status_id").default(1).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, function (table) {
    return {
        dimItemsClientIdDimClientsIdFk: (0, pg_core_1.foreignKey)({
            columns: [table.clientId],
            foreignColumns: [exports.dimClients.id],
            name: "dim_items_client_id_dim_clients_id_fk"
        }),
        dimItemsItemStatusIdDimItemStatusIdFk: (0, pg_core_1.foreignKey)({
            columns: [table.itemStatusId],
            foreignColumns: [exports.dimItemStatus.id],
            name: "dim_items_item_status_id_dim_item_status_id_fk"
        }),
    };
});
exports.dimAccounts = (0, pg_core_1.pgTable)("dim_accounts", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    plaidId: (0, pg_core_1.varchar)("plaid_id").notNull(),
    itemId: (0, pg_core_1.integer)("item_id").notNull(),
    institutionId: (0, pg_core_1.integer)("institution_id").notNull(),
    name: (0, pg_core_1.varchar)().notNull(),
    type: (0, pg_core_1.varchar)(),
    subtype: (0, pg_core_1.varchar)(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow(),
}, function (table) {
    return {
        dimAccountsItemIdDimItemsIdFk: (0, pg_core_1.foreignKey)({
            columns: [table.itemId],
            foreignColumns: [exports.dimItems.id],
            name: "dim_accounts_item_id_dim_items_id_fk"
        }),
        dimAccountsInstitutionIdDimInstitutionsIdFk: (0, pg_core_1.foreignKey)({
            columns: [table.institutionId],
            foreignColumns: [exports.dimInstitutions.id],
            name: "dim_accounts_institution_id_dim_institutions_id_fk"
        }),
    };
});
exports.dimInstitutions = (0, pg_core_1.pgTable)("dim_institutions", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    plaidId: (0, pg_core_1.varchar)("plaid_id").notNull(),
    name: (0, pg_core_1.varchar)().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow().notNull(),
});
exports.dimClients = (0, pg_core_1.pgTable)("dim_clients", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    taxdomeId: (0, pg_core_1.varchar)("taxdome_id").notNull(),
    companyName: (0, pg_core_1.varchar)("company_name").notNull(),
    emailAddress: (0, pg_core_1.varchar)("email_address").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow().notNull(),
});
exports.dimItemStatus = (0, pg_core_1.pgTable)("dim_item_status", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    status: (0, pg_core_1.varchar)(),
});
exports.factLinkRequests = (0, pg_core_1.pgTable)("fact_link_requests", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    linkToken: (0, pg_core_1.varchar)("link_token").notNull(),
    clientId: (0, pg_core_1.integer)("client_id").notNull(),
    requestId: (0, pg_core_1.varchar)("request_id").notNull(),
    requestStatusId: (0, pg_core_1.integer)("request_status_id").default(1).notNull(),
    expiration: (0, pg_core_1.timestamp)({ mode: 'string' }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow().notNull(),
    completedAt: (0, pg_core_1.timestamp)("completed_at", { mode: 'string' }),
    errorMessage: (0, pg_core_1.text)("error_message"),
}, function (table) {
    return {
        factLinkRequestsClientIdDimClientsIdFk: (0, pg_core_1.foreignKey)({
            columns: [table.clientId],
            foreignColumns: [exports.dimClients.id],
            name: "fact_link_requests_client_id_dim_clients_id_fk"
        }),
        factLinkRequestsRequestStatusIdDimRequestStatusIdFk: (0, pg_core_1.foreignKey)({
            columns: [table.requestStatusId],
            foreignColumns: [exports.dimRequestStatus.id],
            name: "fact_link_requests_request_status_id_dim_request_status_id_fk"
        }),
    };
});
exports.dimRequestStatus = (0, pg_core_1.pgTable)("dim_request_status", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    status: (0, pg_core_1.varchar)(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }),
});
exports.factReportRequests = (0, pg_core_1.pgTable)("fact_report_requests", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    plaidId: (0, pg_core_1.varchar)("plaid_id").notNull(),
    clientId: (0, pg_core_1.integer)("client_id").notNull(),
    requestStatusId: (0, pg_core_1.integer)("request_status_id").default(1).notNull(),
    token: (0, pg_core_1.varchar)().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow().notNull(),
    completedAt: (0, pg_core_1.timestamp)("completed_at", { mode: 'string' }),
    month: (0, pg_core_1.varchar)({ length: 3 }).notNull(),
    year: (0, pg_core_1.varchar)({ length: 4 }).notNull(),
    data: (0, pg_core_1.jsonb)(),
}, function (table) {
    return {
        factReportRequestsClientIdDimClientsIdFk: (0, pg_core_1.foreignKey)({
            columns: [table.clientId],
            foreignColumns: [exports.dimClients.id],
            name: "fact_report_requests_client_id_dim_clients_id_fk"
        }),
        factReportRequestsRequestStatusIdDimRequestStatusIdFk: (0, pg_core_1.foreignKey)({
            columns: [table.requestStatusId],
            foreignColumns: [exports.dimRequestStatus.id],
            name: "fact_report_requests_request_status_id_dim_request_status_id_fk"
        }),
    };
});
