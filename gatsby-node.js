const path = require('path');
const { request } = require('graphql-request');
const { createFilePath } = require("gatsby-source-filesystem");

const isProduction = process.env.DEPLOY_PRIME_URL ? true : false;

const MARKDOWN_QUERY = `{
  blogs: allMdx(
    filter: { fields: { category: { eq: "blog" }}}
  ) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
        }
        id
        rawBody
      }
    }
  }
  lessons: allMdx(
    filter: { fields: { category: { eq: "courses" }}}
  ) {
    edges {
      node {
        fields {
          slug
          courseCode
          moduleName
        }
        frontmatter {
          title
        }
        rawBody
      }
    }
  }
}`;

const REBUILD_LESSONS_MUTATION = `
  mutation rebuildLessons($lessons: LessonsInput!) {
    lessons(input: $lessons)
    { slug }
  }
`;

const removeSortPrefix = part => {
  const firstChar = part.search(/[A-Z]/i);
  return part.substring(firstChar);
}

const slugify = title => title.split(' ').join('-').toLowerCase().replace(/[^a-z\-]/g, '');

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {
    const path = createFilePath({ node, getNode });
    const [category, courseCode, moduleName] = path.split('/').slice(1, -1).map(removeSortPrefix);

    createNodeField({
      name: "category",
      node,
      value: category,
    });

    if (category === 'courses') {
      createNodeField({
        name: "courseCode",
        node,
        value: courseCode,
      });
      createNodeField({
        name: "moduleName",
        node,
        value: moduleName,
      });
    } else {
      createNodeField({
        name: "slug",
        node,
        value: path,
      });
    }
  }
};

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve('src/templates/blog.js');
  const LessonTemplate = path.resolve('src/templates/lesson.js');
  const result = await graphql(MARKDOWN_QUERY);
  if (result.errors) {
    throw result.errors
  }
  const blogs = result.data.blogs.edges;
  const lessonsRaw = result.data.lessons.edges;
  blogs.forEach(({ node: { id, fields: { slug }}}) => {
    createPage({
      path: slug,
      component: blogTemplate,
      context: { id }
    });
  });

  createPage({
    path: "/learn/:moduleName/:slug",
    matchPath: "/learn/:moduleName/:slug",
    component: LessonTemplate
  });

  const lessons = lessonsRaw.map(({ node: lesson }) => {
    return {
      courseCode: lesson.fields.courseCode,
      moduleName: lesson.fields.moduleName,
      slug: slugify(lesson.frontmatter.title),
      title: lesson.frontmatter.title,
      body: lesson.rawBody
    };
  });

  const variables = { lessons: { lessons } };
  const url = isProduction
    ? 'https://learn-web-dev.netlify.com/.netlify/functions/graphql'
    : 'http://localhost:9000/graphql'
  const response = await request(url, REBUILD_LESSONS_MUTATION, variables);
  response.lessons.forEach(lesson => console.log(`created ${lesson.slug}`));
}

module.exports = {
  createPages,
  onCreateNode
}