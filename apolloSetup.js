import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-boost';

import { HTTPS, API_BASE_URL } from './config';
// TODO: authentification
/* import { ApolloLink } from 'apollo-link';

const middleware = new ApolloLink((operation, forward) => {
  console.log('Starting', operation);
  return forward(operation);
}); */
// TODO: interceptor erros
/* const afterware = new ApolloLink((operation, forward) => {
  const observable = forward(operation);
  if(observable.constructor.name === 'Observable'){
    return observable.map(response => {
      console.log('Completed', response);
      return response;
    });
  }
  return observable;
}); */
const protocol = HTTPS ? 'https' : 'http';
const ws = HTTPS ? 'wss' : 'ws';

const wsLink = new WebSocketLink({
  uri: `${ws}://${API_BASE_URL}/graphql`,
  options: {
    reconnect: true,
    lazy: true
  },
});
const httpLink = new HttpLink({
  uri: `${protocol}://${API_BASE_URL}/graphql`,
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
  cache: new InMemoryCache(),
  /* link: ApolloLink.from([
    middleware,
    afterware,
    link
  ]), */
  link
});
