import React from 'react';
import { graphql } from 'gatsby';
import Blog from '../components/blog';

const BlogTemplate = ({
  data: {
    mdx: {
      frontmatter,
      frontmatter: { title },
      code: { body },
    },
  },
}) => <Blog frontmatter={frontmatter} body={body} />;

export const pageQuery = graphql`
  query oneBlogQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`;

export default BlogTemplate;
