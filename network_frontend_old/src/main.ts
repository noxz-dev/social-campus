import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { DefaultApolloClient } from '@vue/apollo-composable';
import mitt from 'mitt';
import { createApp, h, provide } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';
import store from './store';

//create event bus 
const eventbus = mitt();


const httpLink = createHttpLink({
  uri: 'http://localhost/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('apollo-token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const defaultClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const app = createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient);
  },
  render() {
    return h(App);
  },
})
  .use(router)
  .use(store)
  
//add eventbus as a global 
app.config.globalProperties.eventbus = eventbus

app.mount('#app');
