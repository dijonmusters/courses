import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import netlifyIdentity from 'netlify-identity-widget';
import fetch from 'node-fetch';

const getHeaders = async () => {
  const headers = { "Content-Type": "application/json" };
  if (netlifyIdentity.currentUser()) {
    const token = await netlifyIdentity.currentUser().jwt();
    return { ...headers, Authorization: `Bearer ${token}` };
  }
  return headers;
}

const httpLink = new HttpLink({
  uri: 'http://localhost:9000/graphql',
  fetch
});

const getApolloClient = async () => {
  const headers = await getHeaders();

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({ headers });
    return forward(operation);
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}

export { getApolloClient };