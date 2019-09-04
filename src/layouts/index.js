import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import netlifyIdentity from 'netlify-identity-widget';
import { getApolloClient } from '../utils/apollo';
// import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import '../styles/default.css';
import Navbar from '../components/navbar';

const Container = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(to top, #5ee7df 0%, #b490ca 100%);
  display: flex;
  flex-direction: column;
  color: white;
`;

const Page = styled.main`
  display: flex;
  flex: 1;
`;

const Content = styled.div`
  max-width: 768px;
  margin: 0 auto;
  flex: 1;
  padding: 1rem 1.5rem;
  background-color: white;
  color: #444;
  margin-bottom: 0.5rem;
`;

const initApollo = async setClient => {
  const client = await getApolloClient();
  setClient(client);
}

const Layout = props => {
  const [client, setClient] = useState(null);
  useEffect(() => {
    netlifyIdentity.init();
    initApollo(setClient);
  }, []);

  return client ? (
    <ApolloProvider client={client}>
      <Container>
        <Navbar />
        <Page>
          <Content>
            {props.children}
          </Content>
        </Page>
      </Container>
    </ApolloProvider>
  ) : null;
}

export default Layout;