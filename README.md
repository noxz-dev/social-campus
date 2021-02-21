# Social Network

- Built on Node version 14.15.3
- Typescript
- Vue 3
- TypeORM
- GraphQL
- Postgres
- Docker

## Startup

- run npm install in network_backend
- add .env file in network_backend (.env-sample is given)

- run npm install in network_frontend

- add .env file to the root folder for container configuration (.env-sample is given)
- run docker-compose up -d

## Production

- provide the given .env files as in startup declared

- run: docker-compose -f production.yml build

- run: docker-compose -f production.yml up -d
