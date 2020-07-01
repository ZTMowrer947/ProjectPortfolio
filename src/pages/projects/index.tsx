// Imports
import { GetStaticProps } from 'next';
import React from 'react';

import { projects as projectData } from '../../../data.json';

// Prop Types
interface PropTypes {
    projects: typeof projectData;
}

// Static Prop Retrieval
const getStaticProps: GetStaticProps<PropTypes> = async () => {
    return Promise.resolve({
        props: { projects: projectData },
    });
};

// Component
const Portfolio: React.FC<PropTypes> = ({ projects }) => {
    return (
        <ul>
            {projects.map((project) => (
                <li key={project.id}>{project.project_name}</li>
            ))}
        </ul>
    );
};

// Exports
export default Portfolio;
export { getStaticProps };
