# Multi-stage build for Next.js production
FROM node:20-slim AS base

# Install dependencies only when needed
FROM base AS deps
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Copy package files AND prisma schema (needed for postinstall)
COPY package.json package-lock.json* ./
COPY prisma ./prisma

# Install dependencies (prisma generate runs in postinstall)
RUN npm ci --no-audit || npm install --no-audit

# Rebuild the source code only when needed
FROM base AS builder
RUN apt-get update && apt-get install -y python3 make g++ curl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Copy package files and install fresh
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci --no-audit

# Download lightningcss prebuilt binary from npm package
RUN curl -L https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.29.1.tgz -o /tmp/lightningcss.tgz && \
    mkdir -p /tmp/lightningcss-extract && \
    tar -xzf /tmp/lightningcss.tgz -C /tmp/lightningcss-extract && \
    mkdir -p node_modules/lightningcss && \
    cp /tmp/lightningcss-extract/package/lightningcss.linux-x64-gnu.node node_modules/lightningcss/

COPY . .

# Build Next.js application (prisma generate happens in postinstall)
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Run migrations with prisma 6 and start server
CMD ["sh", "-c", "npx prisma@6.10.0 migrate deploy && node server.js"]
