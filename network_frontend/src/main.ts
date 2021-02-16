import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { logErrorMessages } from '@vue/apollo-util'
import mitt from 'mitt'
import { createApp, h, provide } from 'vue'
import 'windi.css'
import App from './App.vue'
import router from './router'
import store from './store'

// auth interceptor
const errorLink = onError((error) => {
  error.graphQLErrors?.forEach((err) => {
    if (err.message.includes('Access denied!')) {
      localStorage.removeItem('apollo-token')
      router.push('login')
    }
  })
  logErrorMessages(error)
})

//create event bus
const eventbus = mitt()

const httpLink = createHttpLink({
  uri: 'http://localhost/api/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('apollo-token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const defaultClient = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient)
  },
  render() {
    return h(App)
  },
})
  .use(router)
  .use(store)

app.config.globalProperties.eventbus = eventbus

app.mount('#app')
