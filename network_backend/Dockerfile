FROM node:latest as base

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json ./

# RUN npm install

# # Bundle app source
# COPY . .

# RUN npm run build

FROM base AS deps
WORKDIR /deps
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /builder
COPY --from=deps /deps/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner

COPY --from=builder /builder/dist ./dist
COPY --from=builder /builder/node_modules ./node_modules
COPY --from=builder /builder/package.json ./package.json


EXPOSE 3000:3000

CMD ["npm", "start"]