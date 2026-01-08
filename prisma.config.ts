import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  // Prisma CLI loads this config for all commands.
  // Avoid env() here so `prisma generate` won't fail in CI/builds
  // where DATABASE_URL may be intentionally unset.
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
});
