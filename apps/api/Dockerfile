FROM node:18-alpine AS base
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune api --docker


FROM node:18-alpine AS installer
WORKDIR /app
COPY --from=base /app/out/json/ .
RUN npm install


FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=base /app/out/full/ .
COPY --from=installer /app/ .
RUN npx turbo run build --filter=api...


FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/apps/api/package.json .
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 5081
CMD ["node", "dist/index.js"]

