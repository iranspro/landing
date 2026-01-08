# ═══════════════════════════════════════════════════════════════
# IransPro Landing - Production Docker Image
# Multi-stage build برای Next.js 16 + Prisma 6 + PostgreSQL
# ═══════════════════════════════════════════════════════════════

# ───────────────────────────────────────────────────────────────
# Stage 1: Base Image
# ───────────────────────────────────────────────────────────────
FROM node:20-alpine AS base

# Install OpenSSL برای Prisma (در Alpine نیاز است)
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# ───────────────────────────────────────────────────────────────
# Stage 2: Dependencies
# ───────────────────────────────────────────────────────────────
FROM base AS deps

# نصب ابزارهای لازم برای build کردن native modules
RUN apk add --no-cache python3 make g++ curl

# کپی فایل‌های package
COPY package.json package-lock.json* ./

# کپی Prisma schema برای postinstall
COPY prisma ./prisma

# نصب dependencies
# از --frozen-lockfile برای اطمینان از consistency استفاده می‌کنیم
RUN npm ci --frozen-lockfile --no-audit --no-fund

# دانلود و نصب lightningcss binary برای Alpine (musl)
RUN LIGHTNINGCSS_VERSION=$(node -p "require('./node_modules/lightningcss/package.json').version") && \
    curl -L "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-${LIGHTNINGCSS_VERSION}.tgz" -o /tmp/lightningcss.tgz && \
    tar -xzf /tmp/lightningcss.tgz -C /tmp && \
    cp /tmp/package/lightningcss.linux-x64-musl.node ./node_modules/lightningcss/ && \
    rm -rf /tmp/lightningcss.tgz /tmp/package

# ───────────────────────────────────────────────────────────────
# Stage 3: Builder
# ───────────────────────────────────────────────────────────────
FROM base AS builder

WORKDIR /app

# کپی node_modules از stage قبلی
COPY --from=deps /app/node_modules ./node_modules

# کپی کل پروژه
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js application
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ───────────────────────────────────────────────────────────────
# Stage 4: Runner (Production Image)
# ───────────────────────────────────────────────────────────────
FROM base AS runner

WORKDIR /app

# تنظیمات production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# ایجاد گروه و کاربر nextjs (برای security)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# کپی فایل‌های public
COPY --from=builder /app/public ./public

# کپی standalone output از Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# کپی Prisma files (برای migrations و client)
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# کپی Prisma CLI (برای migrate deploy در CMD)
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.bin/prisma ./node_modules/.bin/prisma

# Switch به کاربر nextjs
USER nextjs

# Expose port
EXPOSE 3000

# Health check (optional but recommended)
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Run migrations و start server
CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && node server.js"]
