// Imports
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import ProjectApi from '@/api/ProjectApi';
import Project from '@/models/Project';

// Prop Types
interface PropTypes {
  project: Project;
}

// Static Prop Retrieval
const getStaticProps: GetStaticProps<PropTypes> = async ({ params }) => {
  // Get project ID
  const id = params?.id;

  // If ID is not a string, or is not a number,
  if (typeof id !== 'string' || Number.isNaN(Number.parseInt(id, 10))) {
    throw new Error('ID must be a numeric value');
  }

  // Otherwise, parse as integer
  const parsedId = Number.parseInt(id, 10);

  // Attempt to find project
  const project = await ProjectApi.get(parsedId);

  // If project could not be found,
  if (!project) {
    // Throw error
    throw new Error(`Could not find project with provided ID`);
  }

  // Attach project data to props
  return {
    props: { project },
  };
};

// Static Paths
const getStaticPaths: GetStaticPaths = async () => {
  // Get project listing
  const projects = await ProjectApi.getList();

  // Create path data without fallback
  return {
    paths: projects.map((project) => ({
      params: {
        id: project.id.toString(),
      },
    })),
    fallback: false,
  };
};

// Component
const ProjectDetail: NextPage<PropTypes> = ({ project }) => {
  return (
    <>
      <Head>
        <title>Zack Mowrer | {project.name}</title>
      </Head>
      <header className="mt-3">
        <Link href="/projects" passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="text-decoration-none">&larr; Back</a>
        </Link>
      </header>

      <hr />

      <article className="portfolio-intro portfolio-project">
        <Row>
          <Col xs={12} md={9}>
            <h1>{project.name}</h1>
            <p className="lead text-dark">{project.description}</p>
          </Col>
          <Col xs={12} md={3}>
            <h6 className="text-uppercase">Technologies</h6>
            <ul>
              {project.technologiesUsed.map((technology) => (
                <li key={technology} data-testid="project-technology">
                  {technology}
                </li>
              ))}
            </ul>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark btn-block text-nowrap"
                data-testid="live-link"
              >
                Live Demo
              </a>
            )}
            <a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark btn-block text-nowrap"
              data-testid="gh-link"
            >
              Github Repo
            </a>
          </Col>
        </Row>
        <hr />
        {project.galleryImages.map((imageUrl, index) => {
          const urlFragments = imageUrl.split('/');
          const filename = urlFragments[urlFragments.length - 1];
          const key = `${project.id}-${filename.replace(/\..*$/, '')}-${index}`;

          return (
            <Image
              src={imageUrl}
              alt={`Gallery image for "${project.name}"`}
              fluid
              thumbnail
              key={key}
              data-testid="gallery-image"
            />
          );
        })}
      </article>
    </>
  );
};

// Exports
export default ProjectDetail;
export { getStaticPaths, getStaticProps };
