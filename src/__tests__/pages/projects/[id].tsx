// Imports
import React from 'react';
import { render } from '@testing-library/react';

import ProjectDetail from '../../../pages/projects/[id]';
import ProjectService from '../../../services/ProjectService';

// Jest mocks
jest.mock('../../../services/ProjectService');

// Test Suite
describe('<ProjectDetail>', () => {
    it('should render project details', async () => {
        // Retrieve mock project data
        const project = await ProjectService.get(1);

        // Render component
        const { queryByText, queryByTestId, queryAllByTestId } = render(<ProjectDetail project={project} />);

        // Retrieve project detail elements
        const projectHeading = queryByText(project.name);
        const projectDescription = queryByText(project.description);
        const projectTechnologies = queryAllByTestId('project-technology');
        const projectLiveLink = queryByTestId('live-link');
        const projectGithubLink = queryByTestId('gh-link');
        const projectGalleryImages = queryAllByTestId('gallery-image');

        /* eslint-disable @typescript-eslint/no-unsafe-call */

        // Expect all single elements to exist in the docment
        expect(projectHeading).toBeInTheDocument();
        expect(projectDescription).toBeInTheDocument();
        expect(projectLiveLink).toBeInTheDocument();
        expect(projectGithubLink).toBeInTheDocument();

        // Expect technology and gallery images to match length of corresponding project items
        expect(projectTechnologies).toHaveLength(project.technologies.length);
        expect(projectGalleryImages).toHaveLength(project.galleryImageUrls.length);

        // For each technology item,
        projectTechnologies.forEach((techItem, index) => {
            // Get corresponding technology
            const technologies = project.technologies[index];

            // Expect each technology item to contain name of technology
            expect(techItem).toHaveTextContent(technologies);
        });

        // For each gallery image,
        projectGalleryImages.forEach((galleryImage, index) => {
            // Get corresponding expected URL
            const galleryImageUrl = project.galleryImageUrls[index];

            // Expect gallery image to have correct source URL
            expect(galleryImage).toHaveAttribute('src', galleryImageUrl);
        });

        /* eslint-enable @typescript-eslint/no-unsafe-call */
    });
});
