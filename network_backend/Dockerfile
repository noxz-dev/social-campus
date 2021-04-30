FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --production

# Bundle app source
COPY . .


EXPOSE 3000:3000

ENTRYPOINT ["npm"]

CMD ["run", "prod"]