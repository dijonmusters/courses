import React from 'react';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import styled from 'styled-components';

const Body = styled.section`
  padding: 0 3rem;
  p {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h2`
  font-family: 'Yantramanav';
  font-size: 2.25rem;
  padding: 1rem 3rem;
  color: #666;
  margin-bottom: 0;
`;

const Bordered = styled.span`
  border-bottom: 1px solid #ddd;
`;

const Blog = ({ frontmatter, body }) => {
  const { title } = frontmatter;
  return (
    <>
      <Title>
        <Bordered>
          {title}
        </Bordered>
      </Title>
      <Body>
        <MDXRenderer {...frontmatter}>{body}</MDXRenderer>
      </Body>
    </>
  );
}

export default Blog;
