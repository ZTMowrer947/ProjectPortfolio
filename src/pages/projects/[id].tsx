// Imports
import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';

import Project from '../../models/Project';
import ProjectService from '../../services/ProjectService';

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
    const project = await ProjectService.get(parsedId);

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
    const projects = await ProjectService.getList();

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
const ProjectDetail: React.FC<PropTypes> = ({ project }) => <h1 className="display-4">{project.name}</h1>;

// Exports
export default ProjectDetail;
export { getStaticProps, getStaticPaths };
