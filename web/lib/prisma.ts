import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });

const prisma = new PrismaClient({ adapter });

export default prisma;
