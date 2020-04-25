/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

// Imports
import React from 'react';
import Container from 'react-bootstrap/Container';
import { useStaticQuery, graphql } from 'gatsby';
import 'bootstrap/scss/bootstrap.scss';

import Header from './header';
import './layout.scss';

// Component
const Layout: React.FC = ({ children }) => {
    // Query site metadata
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    // Render site content
    return (
        <>
            <Header siteTitle={data.site.siteMetadata.title} />
            <Container fluid>
                <main>{children}</main>
                <footer className="mt-3 text-center">
                    © {new Date().getFullYear()}, Built with
                    {` `}
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
            </Container>
        </>
    );
};

// Export
export default Layout;
