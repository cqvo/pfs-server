import { buildSchema } from 'drizzle-graphql';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { db as client, schema as dbSchema } from '../../libs/db.js';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// import * as dbSchema from '../../db/schema.js';

const db = drizzle({ client, schema: dbSchema });

const { schema } = buildSchema(db);

const server = new ApolloServer({ schema });
const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);