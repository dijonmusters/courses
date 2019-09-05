import ApolloClient, { InMemoryCache } from 'apollo-boost';

const isClient = typeof window !== 'undefined';

const getApolloClient = async () => {
  if (isClient) {
    return new ApolloClient({
      uri: `${isClient && window.location.origin}/.netlify/functions/graphql`,
      cache: new InMemoryCache()
    });
  }
}

export { getApolloClient };