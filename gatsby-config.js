module.exports = {
    siteMetadata: {
        title: `Zack Mowrer`,
        description: `Witness the coding prowess manifested within the projects from the child prodigy of the Mountain State.`,
        author: `@zackmowrer`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `zackm-portfolio`,
                short_name: `zackm`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-typescript`,
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                implementation: require('sass'),
                fiber: require('fibers'),
                precision: 6,
                useResolveUrlLoader: {
                    options: {
                        sourceMap: true,
                    },
                },
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
