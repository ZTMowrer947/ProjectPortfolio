// Imports
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Project from '../../models/Project';
import ProjectService from '../../services/ProjectService';

// Prop Types
interface PropTypes {
    projects: Project[];
}

// Static Prop Retrieval
const getStaticProps: GetStaticProps<PropTypes> = async () => {
    const projects = await ProjectService.getList();

    return {
        props: {
            projects,
        },
    };
};

// Component
const Portfolio: React.FC<PropTypes> = ({ projects }) => {
    return (
        <>
            <article className="portfolio-intro">
                <h1 className="display-4">Welcome!</h1>
                <p className="lead text-dark">
                    Below is the many projects demonstrating my programming prowess, primarily in Full-Stack JavaScript. Many of the below
                    projects also have live demos, the links to which are provided in the detail page for such projects.
                </p>
            </article>
            <hr />
            <article className="portfolio-index">
                <Row as="ul" className="list-unstyled">
                    {projects.map((project) => (
                        <Col as="li" xs={12} md={6} lg={4} key={project.id} data-testid="project-item">
                            <Link href={`/projects/${project.id}`} passHref>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="project-link text-decoration-none">
                                    <Image fluid thumbnail src={project.landingImageUrl} alt={`Landing image for "${project.name}"`} />

                                    <span className="project-title mb-4 d-inline-block text-center text-uppercase w-100">
                                        {project.name}
                                    </span>
                                </a>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </article>
            <style jsx>
                {`
                    .portfolio-index .project-title {
                        font-family: 'Work Sans', sans-serif;
                        font-size: 1.25rem;
                    }
                `}
            </style>
        </>
    );
};

// Exports
export default Portfolio;
export { getStaticProps };
