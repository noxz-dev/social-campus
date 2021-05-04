FROM node:latest as base

FROM base AS deps
WORKDIR /deps
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /builder
COPY --from=deps /deps/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --production

FROM base AS runner
ENV NODE_ENV production
COPY --from=builder /builder/dist ./dist
COPY --from=builder /builder/node_modules ./node_modules
COPY --from=builder /builder/package.json ./package.json
COPY --from=builder /builder/dist/ormconfig.js ./ormconfig.js
COPY --from=builder /builder/dist/ormconfig.js.map ./ormconfig.js.map

EXPOSE 3000:3000

CMD ["npm", "start"]