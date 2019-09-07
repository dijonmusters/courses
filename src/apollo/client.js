import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import netlifyIdentity, { currentUser as getCurrentUser } from 'netlify-identity-widget';

const isClient = typeof window !== 'undefined';

const getAuthHeaders = async () => {
  netlifyIdentity.init();
  const user = getCurrentUser && getCurrentUser();
  if (user) {
    const token = await user.jwt();
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

const host = isClient
  ? window.location.origin
  : 'https://learn-web-dev.netlify.com';

const uri = `${host}/.netlify/functions/graphql`;



const getClient = async () => {
  const headers = await getAuthHeaders();

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({ headers });
    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri,
    headers,
    fetch
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });
  // NEED TO GET THIS

  // return new ApolloClient({
  //   uri,
  //   fetch
  // });
}

export { getClient }