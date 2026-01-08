# ================= BASE =================
FROM node:20-alpine AS base
WORKDIR /app

# ================= DEPS =================
FROM base AS deps
COPY package.json package-lock.json ./

# ⛔️ خیلی مهم: جلوگیری کامل از اجرای postinstall
RUN npm ci --ignore-scripts

# ================= BUILDER =================
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# حالا schema.prisma وجود دارد
RUN npx prisma generate
RUN npm run build

# ================= RUNNER =================
FROM node:20-alpine AS runner
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
