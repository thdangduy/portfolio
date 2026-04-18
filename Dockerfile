# Sử dụng Bun làm base image để build cho nhanh
FROM oven/bun:1.1-alpine AS base
WORKDIR /app

# Stage 1: Cài đặt dependencies
FROM base AS deps
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Stage 2: Build source code
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Các biến môi trường cần thiết lúc build (nếu có)
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PRIVATE_STANDALONE=true
RUN bun run build

# Stage 3: Runner (Image cuối cùng siêu nhẹ)
FROM base AS runner
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Tạo user để chạy cho bảo mật, không dùng root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

# Chạy app bằng server standalone của Next.js
CMD ["bun", "server.js"]