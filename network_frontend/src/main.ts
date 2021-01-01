import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createApp, h, provide } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql"
});
const defaultClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});
createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient);
  },
  render() {
    return h(App);
  }
})
  .use(router)
  .use(store)
  .mount("#app");
