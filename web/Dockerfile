# syntax=docker/dockerfile:1
FROM node:26-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS dependencies
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
# Prerender a placeholder gallery without opening a production database.
RUN SKIP_GALLERY_PRERENDER=1 DATABASE_URL=file:/tmp/build-only.db npm run build

FROM base AS runner
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    IMAGES_DIR=/app/images
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
COPY --chown=node:node docker-start.mjs ./docker-start.mjs
RUN mkdir -p .next/cache data images && chown -R node:node .next data images
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=75s --retries=3 \
    CMD ["node", "docker-start.mjs", "--healthcheck"]
CMD ["node", "docker-start.mjs"]
