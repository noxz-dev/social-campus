import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { logErrorMessages } from '@vue/apollo-util';
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

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/subscriptions`,
  options: {
    reconnect: true,
  },
});

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
