import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { db } from '#libs/db.js';
import { dimClients, dimAccounts, dimItems, factLinkRequests } from '../../db/schema.js';

import logger from '#libs/logger.js';

const linkModel = {
    findById: async (linkId) => {
        try {
            const links = await db.select().from(factLinkRequests).where(eq(factLinkRequests.id, linkId));
            console.log('link', links[0]);
            return links[0];
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    },
    findByLinkToken: async (linkToken) => {
        try {
            const links = await db.select()
                .from(factLinkRequests)
                .where(eq(factLinkRequests.linkToken, linkToken));
            return links[0];
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    },
    addLink: async (values) => {
        try {
            return await db.insert(factLinkRequests)
                .values(values)
                .returning();
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    },
    upsertItem: async (values) => {
        try {
            return await db.insert(dimItems)
                .values(values)
                .onConflictDoUpdate({
                    target: dimItems.plaidId,
                    set: {
                        accessToken: values.accessToken,
                    }
                })
                .returning();
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    },
}

export default linkModel;