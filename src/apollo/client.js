import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

const isClient = typeof window !== 'undefined';

const host = isClient
  ? window.location.origin
  : 'https://learn-web-dev.netlify.com';

const uri = `${host}/.netlify/functions/graphql`;

const getClient = async () => {
  return new ApolloClient({
    uri,
    fetch,
  });
}

export { getClient }