// Imports
import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';

import { projects as projectData } from '../../../data.json';

// Prop Types
interface PropTypes {
    project: typeof projectData[0];
}

// Static Prop Retrieval
const getStaticProps: GetStaticProps<PropTypes> = async ({ params }) => {
    // Attempt to find project
    const project = projectData.find((proj) => proj.id.toString() === params?.id);

    // If project could not be found,
    if (!project) {
        // Throw error
        throw new Error(`Could not find project with provided ID`);
    }

    return Promise.resolve({
        props: { project },
    });
};

// Static Paths
const getStaticPaths: GetStaticPaths = async () => {
    return Promise.resolve({
        paths: projectData.map((project) => ({
            params: {
                id: project.id.toString(),
            },
        })),
        fallback: false,
    });
};

// Component
const ProjectDetail: React.FC<PropTypes> = ({ project }) => <h1 className="display-4">{project.project_name}</h1>;

// Exports
export default ProjectDetail;
export { getStaticProps, getStaticPaths };
