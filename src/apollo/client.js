import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { init, currentUser as getCurrentUser } from 'netlify-identity-widget';

const isClient = typeof window !== 'undefined';

const getAuthHeaders = async () => {
  init();
  const user = getCurrentUser && getCurrentUser();
  if (user) {
    const token = await user.jwt();
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

const host = isClient
  ? window.location.origin
  : 'https://learn-web-dev.netlify.com';

const uri = `${host}/.netlify/functions/graphql`;

const getClient = async () => {
  const headers = await getAuthHeaders();

  const httpLink = new HttpLink({
    uri,
    headers,
    fetch,
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export { getClient };
