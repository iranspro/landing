// Prisma Client Singleton
// Prevents multiple instances in development

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const missingDatabaseUrlMessage =
  'DATABASE_URL is not set. Provide it at runtime (e.g. via .env.local or container env vars).';

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(missingDatabaseUrlMessage);
  }

  const adapter = new PrismaPg({
    connectionString: databaseUrl,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

export const prisma =
  globalForPrisma.prisma ??
  (process.env.DATABASE_URL
    ? createPrismaClient()
    : (new Proxy(
        {},
        {
          get() {
            throw new Error(missingDatabaseUrlMessage);
          },
        }
      ) as unknown as PrismaClient));

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
