import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { split } from '@apollo/client/link/core/split';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { logErrorMessages } from '@vue/apollo-util';
import { createUploadLink } from 'apollo-upload-client';
import router from './router';

// auth interceptor
const errorLink = onError((error) => {
  console.log(error);
  error.graphQLErrors?.forEach((err) => {
    if (err.message.includes('Access denied!')) {
      localStorage.removeItem('apollo-token');
      router.push('login');
    }
  });
  logErrorMessages(error);
});

//subscriptions
const wsLink = new WebSocketLink({
  uri: process.env.VITE_WS_URL || 'ws://localhost/subs/',
  options: {
    reconnect: true,
    connectionParams: {
      campusToken: localStorage.getItem('apollo-token'),
    },
  },
});

//querys and mutations
const httpLink = createUploadLink({
  uri: process.env.VITE_API_URL || 'http://localhost/api/graphql',
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

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const defaultClient = new ApolloClient({
  link: errorLink.concat(authLink).concat(link),

  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export async function onLogout() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('apollo-token');
  }
  try {
    await defaultClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message);
  }
}
