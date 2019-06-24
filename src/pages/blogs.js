import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Blog from '../components/blog';

const Container = styled.div`
  width: 100%;
`;

const BlogContainer = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const renderBlog = ({
  node: { id, frontmatter, code: { body }}
}) => (
  <BlogContainer key={id}>
    <Blog frontmatter={frontmatter} body={body} />
  </BlogContainer>
);

const Blogs = ({ data: { allMdx: { edges }}}) => (
  <Container>
    {edges.map(renderBlog)}
  </Container>
);

export const pageQuery = graphql`
  query blogList {
    allMdx {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
          code {
            body
          }
        }
      }
    }
  }
`;

export default Blogs;