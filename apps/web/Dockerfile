# Multi-stage build for the Next.js web app in a pnpm monorepo.
# Build context must be the REPO ROOT:  docker build -f apps/web/Dockerfile -t codeebe-web .
# NOTE: NEXT_PUBLIC_* vars are baked at build time — pass them with --build-arg.
FROM node:20-slim AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /app

FROM base AS build
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_CALENDLY_URL
ARG NEXT_PUBLIC_WHATSAPP_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_CALENDLY_URL=$NEXT_PUBLIC_CALENDLY_URL
ENV NEXT_PUBLIC_WHATSAPP_URL=$NEXT_PUBLIC_WHATSAPP_URL
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @codeebe/web build

FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
# Next.js standalone output bundles only what the server needs
COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
