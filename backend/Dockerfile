# reference: https://hono.dev/docs/getting-started/nodejs#dockerfile
FROM node:20.11.0-slim as base

FROM base AS builder

WORKDIR /app

# install openssl
RUN \
  apt-get update \
  && apt-get install -y --no-install-recommends \
  openssl=3.0.* \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY package*json tsconfig.json src ./

RUN npm ci && \
  npm run build && \
  npm prune --production

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

EXPOSE 80

CMD ["node", "/app/dist/index.js"]