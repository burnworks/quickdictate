# syntax=docker/dockerfile:1

FROM node:22-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run buildcss
RUN npm prune --omit=dev

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build --chown=node:node /app /app

USER node
EXPOSE 3000

CMD ["node", "server.js"]
