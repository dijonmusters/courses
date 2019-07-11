import React from 'react';
import styled from 'styled-components';
import '../styles/default.css';
import Header from '../components/header';
import Navbar from '../components/navbar';

const Container = styled.div`
  min-height: 100vh;
  /* background: linear-gradient(to right, #BDFFF3, #4AC29A); */
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

const Nav = styled.div`
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
`;

const Layout = props => {
  return (
    <Container>
      {/* <Nav>
        <Header />
      </Nav> */}
      <Navbar />
      {/* <Page>
        <Content>
          {props.children}
        </Content>
      </Page> */}
    </Container>
  );
}

export default Layout;