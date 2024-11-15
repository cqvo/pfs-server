import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import logger from '#libs/logger.js';
import { config } from 'dotenv';
config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle({ client: sql });

import { dimItemStatus, dimRequestStatus } from '../db/schema.js';
export const seedStatus = async () => {
    try {
        await db.insert(dimRequestStatus)
            .values([
                { id: 1, status: 'Pending' },
                { id: 2, status: 'Completed' },
                { id: 3, status: 'Failed' }
            ])
            .onConflictDoNothing();
        await db.insert(dimItemStatus)
            .values([
                { id: 1, status: 'Pending' },
                { id: 2, status: 'Completed' },
                { id: 3, status: 'Failed' }
            ])
            .onConflictDoNothing();
        logger.info('Seeded item and request status tables');
    } catch (error) {
        logger.error(error);
    }
}