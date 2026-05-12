# syntax=docker/dockerfile:1

FROM node:24-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM node:24-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS
ARG NEXT_PUBLIC_CLOUDFLARE_R2_BASE_URL

ENV DATABASE_URL=mongodb://placeholder:27017/portfolio?serverSelectionTimeoutMS=1000
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL:-http://localhost:3000}
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS=$NEXT_PUBLIC_GOOGLE_ANALYTICS
ENV NEXT_PUBLIC_CLOUDFLARE_R2_BASE_URL=${NEXT_PUBLIC_CLOUDFLARE_R2_BASE_URL:-http://localhost:3000}

RUN npx prisma generate
RUN BETTER_AUTH_SECRET=build-placeholder-secret-at-least-32-chars npm run build

FROM node:24-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.generated ./.generated

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
