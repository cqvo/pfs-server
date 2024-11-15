import dotenv from 'dotenv';
dotenv.config();
import { db, schema } from './libs/db.js';

async function main() {
    const users = await db.select().from(schema.dimClients);
    console.log('Returning users', users);
}

main();