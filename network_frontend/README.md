# Fronted - SocialCampus

## 📦 Install

- run npm install to install all dependecies
- run npm run generate when a graphql query or mutation is added to the graphql folder, to autogenerate the needed types
- DONT run the vite dev server directly via `npm run dev`, use the docker setup available from the root folder

## 📁 Folder Structure

- root: configs and setup
  - src: code
    - components: all vue components
    - graphql: graphql querys and mutations and auto-generated types
    - router: vue-router code
    - store: vuex code
    - types: typescript types
    - utils: utility functions
    - views: all exisiting views referenced by the vue router
    - apollo.ts: initialize the apollo (graphql) client & cache
    - App.vue: entry Vue Component
    - main.ts: vue instance
    - markdown.css: extra markdown css styles to work with tailwindcss

## ✨ Credits

Icons by [PhosphorIcons](https://phosphoricons.com/) & [Iconly](https://iconly.pro/)

## 📄 License

[MIT License](https://github.com/HeyImNoxz/network/blob/main/LICENSE) © 2021-PRESENT [Finn Beer](https://github.com/HeyImNoxz)
