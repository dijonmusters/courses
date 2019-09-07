import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { getClient } from './client';

const initClient = async setClient => {
  const client = await getClient();
  setClient(client);
}

const Provider = ({ children }) => {
  const [client, setClient] = useState();
  useEffect(() => {
    initClient(setClient);
  }, []);
  return client
    ? <ApolloProvider client={client}>{children}</ApolloProvider>
    : <div>Loading Apollo client</div>;
}

export default Provider;