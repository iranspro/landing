# ================= BASE =================
FROM node:20-slim AS base
WORKDIR /app

# ================= DEPS =================
FROM base AS deps
COPY package.json package-lock.json ./

# اسکریپت‌ها اجرا نمی‌شن (Prisma امن)
RUN npm ci --ignore-scripts

# ================= BUILDER =================
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 🔥 خیلی مهم: native deps (lightningcss) اینجا ساخته می‌شن
RUN npm rebuild lightningcss --build-from-source

# Prisma
RUN npx prisma generate

# Next build
RUN npm run build

# ================= RUNNER =================
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
