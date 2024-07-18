# reference: https://hono.dev/docs/getting-started/nodejs#dockerfile
FROM node:20.11.0-slim as base

FROM base AS builder

# install OpenSSL
RUN \
  apt-get update \
  && apt-get install -y --no-install-recommends \
  openssl=3.0.* \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*json tsconfig.json src ./

RUN npm ci && \
  npm run build && \
  npm prune --production

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER hono
EXPOSE 3000

CMD ["node", "/app/dist/index.js"]