import ApolloClient, { ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { currentUser as getCurrentUser } from 'netlify-identity-widget';
import fetch from 'isomorphic-fetch';

const isClient = typeof window !== 'undefined';

const getAuthHeaders = async () => {
  const user = getCurrentUser && getCurrentUser();
  if (user) {
    const token = await user.jwt();
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

const httpLink = new HttpLink({
  uri: `${isClient && window.location.origin}/.netlify/functions/graphql`,
  fetch
});

const getApolloClient = async () => {
  if (isClient) {
    const headers = await getAuthHeaders();

    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext({ headers });
      return forward(operation);
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });
  }
  return null;
}

export { getApolloClient };