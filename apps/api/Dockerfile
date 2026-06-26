# Multi-stage build for the NestJS API in a pnpm monorepo.
# Build context must be the REPO ROOT:  docker build -f apps/api/Dockerfile -t codeebe-api .
FROM node:20-slim AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
# openssl is required by the Prisma query engine
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @codeebe/queue build
RUN pnpm --filter @codeebe/api build
# Produce a self-contained deployment folder (app + flattened prod node_modules)
RUN pnpm --filter @codeebe/api deploy --prod /prod/api
# Ensure the Prisma client is generated for the linux runtime
RUN cd /prod/api && pnpm exec prisma generate

FROM base AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /prod/api ./
EXPOSE 3001
CMD ["node", "dist/src/main.js"]
