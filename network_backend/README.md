# Backend - SocialCampus

## 📦 Install

- run npm install to install all dependecies
- DONT run the ts-node server directly via `npm run dev`, use the docker setup available from the root folder

## 📁 Folder Structure

- root: configs and setup
  - src: code
    - entity: all exisiting entitys
    - graphql_types: extra graphql schema types
    - resolvers: graphql resolvers with querys and mutations
    - utils: general utility functions
    - middlewares: middleware functions
    - validators: validation rules, used in the resolvers
    - index.ts: entry point of the application
    - application.ts: initialize the full application

## 📄 License

[MIT License](https://github.com/HeyImNoxz/network/blob/main/LICENSE) © 2021-PRESENT [Finn Beer](https://github.com/HeyImNoxz)
