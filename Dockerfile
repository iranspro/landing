# ================= BASE =================
# Debian-based image to avoid musl/native-binary issues (Tailwind v4, LightningCSS, etc.)
FROM node:20-bullseye-slim AS base

WORKDIR /app

# ================= DEPS =================
FROM base AS deps

# Build tools for native modules
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 make g++ ca-certificates openssl && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

# Install deps (do NOT use npm ci here: package-lock generated on Windows can miss Linux optional deps)
RUN npm install --no-audit --no-fund

# Ensure lightningcss native binary package is present on Linux
RUN node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync('node_modules/lightningcss/package.json','utf8')); process.stdout.write(p.optionalDependencies['lightningcss-linux-x64-gnu']);" \
    | xargs -I{} npm install --no-audit --no-fund --no-save lightningcss-linux-x64-gnu@{}

# Ensure Tailwind Oxide native binary package is present on Linux
RUN node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync('node_modules/@tailwindcss/oxide/package.json','utf8')); process.stdout.write(p.optionalDependencies['@tailwindcss/oxide-linux-x64-gnu']);" \
    | xargs -I{} npm install --no-audit --no-fund --no-save @tailwindcss/oxide-linux-x64-gnu@{}

# ================= BUILDER =================
FROM base AS builder

RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates openssl && \
    rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma Client
RUN npx prisma generate

# Force webpack build (avoids Turbopack native binding edge-cases)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx next build --webpack

# ================= RUNNER =================
FROM node:20-bullseye-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Runtime deps for Prisma (OpenSSL)
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates openssl && \
    rm -rf /var/lib/apt/lists/*

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

# Next.js standalone output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Prisma schema + migrations
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

# migrate + start
CMD ["sh", "-c", "npx prisma@6.10.0 migrate deploy && node server.js"]
