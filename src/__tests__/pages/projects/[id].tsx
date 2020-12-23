// Imports
import { render } from '@testing-library/react';

import ProjectApi from '@/api/ProjectApi';
import ProjectDetail from '@/pages/projects/[id]';

// Jest mocks
jest.mock('@/api/ProjectApi');

// Test Suite
describe('<ProjectDetail>', () => {
  it('should render project details', async () => {
    // Retrieve mock project data
    const project = await ProjectApi.get(1);

    if (!project) throw new Error('Could not retrieve project');

    // Render component
    const { queryByText, queryByTestId, queryAllByTestId } = render(
      <ProjectDetail project={project} />
    );

    // Retrieve project detail elements
    const projectHeading = queryByText(project.name);
    const projectDescription = queryByText(project.description);
    const projectTechnologies = queryAllByTestId('project-technology');
    const projectLiveLink = queryByTestId('live-link');
    const projectGithubLink = queryByTestId('gh-link');
    const projectGalleryImages = queryAllByTestId('gallery-image');

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
  });
});
