import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { db } from '#libs/db.js';
import { dimClients, dimAccounts, dimItems } from '../../db/schema.js';

import logger from '#libs/logger.js';

const clientModel = {
    findById: async (clientId) => {
        try {
            return db.select().from(dimClients).where(eq(dimClients.id, clientId));
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    },
    findAll: async () => {
        try {
            return db.select().from(dimClients);
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    },
    addClients: async (data) => {
        try {
            const clients = [];
            for (const row of data) {
                const client = await db.insert(dimClients)
                    .values({
                        taxdomeId: row.taxdomeId,
                        companyName: row.companyName,
                        emailAddress: row.emailAddress,
                    })
                    .onConflictDoUpdate({
                        target: dimClients.taxdomeId,
                        set: {
                            companyName: row.companyName,
                            emailAddress: row.emailAddress
                        }
                    })
                    .returning();
                clients.push(client);
            }
            return clients;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }
};

export default clientModel;