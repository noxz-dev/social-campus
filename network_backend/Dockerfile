FROM node:16-alpine as base

FROM base AS deps
WORKDIR /deps
COPY package*.json ./
RUN apk update && apk add make g++ gcc automake autoconf libtool musl-dev nasm file pkgconf tiff jpeg zlib zlib-dev && rm -rf /var/cache/apk/*

RUN npm ci

FROM base AS builder
RUN apk update && apk add curl bash && rm -rf /var/cache/apk/*
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
WORKDIR /builder
COPY --from=deps /deps/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --production
RUN /usr/local/bin/node-prune

FROM base AS runner
ENV NODE_ENV production
COPY --from=builder /builder/dist ./dist
COPY --from=builder /builder/node_modules ./node_modules
COPY --from=builder /builder/package.json ./package.json
COPY --from=builder /builder/dist/ormconfig.js ./ormconfig.js
COPY --from=builder /builder/dist/ormconfig.js.map ./ormconfig.js.map

EXPOSE 3000:3000

CMD ["npm", "start"]