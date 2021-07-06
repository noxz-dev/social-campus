# SocialCampus - Open Source Self Hosted Social Network

## ⚙️ TechStack

- Built on Node version 16.1.0
- Typescript
- Node.js
- Vue 3
- TypeORM
- GraphQL
- Postgres
- Docker
- Minio

## 🔨 Development-Startup

- install node 16.1.0

- run: npm install in network_backend

- run: npm install in network_frontend

- run: npm run generate in network_frontend

- add .env file to the root folder for container configuration (.env-sample is given)

- set NODE_ENV=development in the .env file

- run: docker-compose up -d

## 💻 Demo-Startup

- add .env file to the root folder for container configuration (.env-sample is given)

- .env.production in the network_frontend folder needs to be set to:

  - VITE_API_URL=http://localhost/api/graphql
  - VITE_WS_URL=ws://localhost/subs/

- set NODE_ENV=production in the .env file

- run: docker-compose -f docker-compose.demo.yml up -d

## 🏭 Production

- use the production repo for automatic ssl and updated reverse proxy

## 📁 Folder Structure

- network_frontend: frontend code of SocialCampus
- network_backend: backend code of SocialCampus
- docker-compose.yml: docker-compose configuration for the dev enviroment
- docker-compose.demo.yml: docker-compose conifguration for the demo enviroment
- nginx: nginx config for the reverse proxy
- demo_nginx: nginx config for the reverse proxy in the demo enviroment
- .github/workflows: github actions (CI-Pipeline) to automatically build containers and push to registry

## 📄 License

[MIT License](https://github.com/HeyImNoxz/network/blob/main/LICENSE) © 2021-PRESENT [Finn Beer](https://github.com/HeyImNoxz)
