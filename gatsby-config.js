/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const proxy = require("http-proxy-middleware")
module.exports = {
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-mdx`,
      options: {
        gatsbyRemarkPlugins: [{
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1035
          }
        }]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    }
  ],
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    )
  },
}
