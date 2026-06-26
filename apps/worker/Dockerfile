# Multi-stage build for the BullMQ worker in a pnpm monorepo.
# Build context must be the REPO ROOT:  docker build -f apps/worker/Dockerfile -t codeebe-worker .
FROM node:20-slim AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /app

FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @codeebe/queue build
RUN pnpm --filter @codeebe/worker build
RUN pnpm --filter @codeebe/worker deploy --prod /prod/worker

FROM base AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /prod/worker ./
CMD ["node", "dist/main.js"]
