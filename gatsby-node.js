const path = require('path');
const { createFilePath } = require("gatsby-source-filesystem");

const slugify = words => `/blog/${words.toLowerCase().replace(' ', '-')}`;

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: "slug",
      node,
      value: `/blogs${value}`
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve('src/templates/blog.js');

  return graphql(`
    query allBlogsQuery {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
    .then(result => {
      if (result.errors) {
        console.error(result.errors);
        throw result.errors;
      }
      result.data.allMdx.edges.forEach(({ node: { id, fields: { slug }}}) => {
        createPage({
          path: slug,
          component: blogTemplate,
          context: { id }
        });
      });
    })
}