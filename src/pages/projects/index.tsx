// Imports
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { map } from 'rxjs/operators';
import styled from 'styled-components';

import ProjectApi, { ProjectLinkData } from '@/api/ProjectApi';

// Prop Types
interface PropTypes {
  projects: ProjectLinkData[];
}

// Static Prop Retrieval
const getStaticProps: GetStaticProps<PropTypes> = async () => {
  return ProjectApi.getList()
    .pipe(
      map((projects) => ({
        props: {
          projects,
        },
        revalidate: 1,
      }))
    )
    .toPromise();
};

// Styled components
const ProjectTitle = styled.span`
  font-family: 'Work Sans', sans-serif;
  font-size: 1.25rem;
`;

// Component
const Portfolio: NextPage<PropTypes> = ({ projects }) => {
  return (
    <>
      <article>
        <h1 className="display-4">Welcome!</h1>
        <p className="lead text-dark">
          Below is the many projects demonstrating my programming prowess,
          primarily in Full-Stack JavaScript. Many of the below projects also
          have live demos, the links to which are provided in the detail page
          for such projects.
        </p>
      </article>
      <hr />
      <article>
        <Row as="ul" className="list-unstyled">
          {projects.map((project) => (
            <Col
              as="li"
              xs={12}
              md={6}
              lg={4}
              key={project.id}
              data-testid="project-item"
            >
              <Link href={`/projects/${project.id}`} passHref>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="text-decoration-none">
                  <Image
                    fluid
                    thumbnail
                    src={project.landingImage}
                    alt={`Landing image for "${project.name}"`}
                  />

                  <ProjectTitle className="project-title mb-4 d-inline-block text-center text-uppercase w-100">
                    {project.name}
                  </ProjectTitle>
                </a>
              </Link>
            </Col>
          ))}
        </Row>
      </article>
    </>
  );
};

// Exports
export default Portfolio;
export { getStaticProps };
