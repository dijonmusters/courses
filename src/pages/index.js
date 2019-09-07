import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  margin: 0 3rem;
`;

const Container = styled.section`
  text-align: center;
`;

const Title = styled.h2`
  font-family: 'Yantramanav';
  padding-top: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #ddd;
  color: #666;
`;

const Index = props => (
  <Container>
    <Title>JavaScript University</Title>
    <Paragraph>
      JSU is a place to learn new things about JavaScript, or perhaps refresh
      some old things that are beginning to fade. The majority of content is
      free and designed to be as accessible as possible to the most amount of
      people!
    </Paragraph>
  </Container>
);

export default Index;
