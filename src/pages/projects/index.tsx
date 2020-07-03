// Imports
import { GetStaticProps } from 'next';
import React from 'react';

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
        <ul>
            {projects.map((project) => (
                <li key={project.id}>{project.name}</li>
            ))}
        </ul>
    );
};

// Exports
export default Portfolio;
export { getStaticProps };
