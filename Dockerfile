# syntax=docker/dockerfile:1

# Multi-stage Next.js build using npm with a minimal runtime image

# 1) Dependencies layer
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install







# 2) Builder layer
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time public envs for Next.js
ENV NODE_ENV=production

# Build the app
RUN npm run build






# 3) Production runtime
FROM node:20-alpine AS runner
WORKDIR /app

# Copy the build from the first stage
COPY --from=builder /app .

EXPOSE 3000
# Start Next.js via node directly; no npm/pnpm at runtime
CMD ["npm", "start"]