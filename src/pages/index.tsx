// Imports
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import projectData from '../../newdata.json';

// Page
const IndexPage: React.FC = () => {
    return (
        <Layout>
            <SEO title="Home" />
            <Row>
                <Col xs={12}>
                    <h1 className="display-4">Welcome!</h1>
                    <p className="lead text-dark">
                        This portfolio demonstrates my proficiency in
                        programming, primarily in Full-Stack JavaScript. I am a
                        motivated learner, always striving to expand and apply
                        my vast knowledge. Need I say more?
                    </p>
                </Col>
                {projectData.projects.map((project) => (
                    <Col xs={12} sm={6} lg={4} key={project.id}>
                        <Link to={`/projects/${project.id}`}>
                            <img
                                src={project.image_urls.landing}
                                alt="Project landing image"
                                className="img img-fluid"
                            />
                            <h5>{project.project_name}</h5>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Layout>
    );
};

// Export
export default IndexPage;
