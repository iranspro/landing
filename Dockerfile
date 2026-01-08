# ================= BASE =================
FROM node:20-bullseye AS base

WORKDIR /app

# نصب ابزارهای لازم برای rebuild native modules
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    make \
    gcc \
    g++ \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# ================= DEPS =================
FROM base AS deps

# فقط package.json و package-lock.json رو کپی کن
COPY package.json package-lock.json ./

# نصب dependency ها
RUN npm ci --ignore-scripts

# ================= BUILDER =================
FROM base AS builder

# کپی کردن node_modules از مرحله deps
COPY --from=deps /app/node_modules ./node_modules

# کپی کل سورس کد
COPY . .

# rebuild LightningCSS از سورس (حل مشکل missing binary)
RUN npm rebuild lightningcss --build-from-source

# generate Prisma client
RUN npx prisma generate

# ================= BUILD =================
# Build Next.js
# --no-turbopack برای جلوگیری از ارور LightningCSS
RUN NEXT_EXPERIMENTAL_TURBOPACK=false npm run build

# ================= RUNNER =================
FROM base AS runner

WORKDIR /app

# فقط فایل های لازم برای run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]
