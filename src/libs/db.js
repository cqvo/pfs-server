import { drizzle } from 'drizzle-orm/neon-serverless';

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:Mzm18LVljbcP@ep-dawn-fog-a5o424gy.us-east-2.aws.neon.tech/neondb?sslmode=require';

export * as schema from '../db/schema';
export const db = drizzle({connectionString, schema});