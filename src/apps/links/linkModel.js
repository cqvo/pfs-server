import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless/';
import { dimClients, dimItems, factLinkRequests } from '../../db/schema';
import logger from '$libs/logger.js';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

const linkModel = {
    findById: async (linkId) => {
        try {
            return await db.select().from(factLinkRequests).where(eq(factLinkRequests.id, linkId));
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    },
    findByLinkToken: async (linkToken) => {
        try {
            return await db.select()
                .from(factLinkRequests)
                .where(eq(factLinkRequests.linkToken, linkToken));
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