// Imports
import { render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';

import Project from '@/models/Project';
import ProjectDetail from '@/pages/projects/[id]';

// Test data
const projectA: Project = {
  id: 'dc0e9ad6-e1c2-4d04-89c4-7181897848dc',
  name: 'Project #1',
  description: 'Lorem ipsum dolor sit amet.',
  technologiesUsed: ['Jest'],
  sourceLink: 'http://example.com',
  liveLink: 'http://example.com',
  landingImage: 'https://place-hold.it/640x480',
  galleryImages: [
    'https://place-hold.it/640x480',
    'https://place-hold.it/640x480',
    'https://place-hold.it/640x480',
  ],
};

const projectB: Project = {
  id: '0b701ed7-ec0f-418c-a781-84370d1a9a08',
  name: 'Project #2',
  description: 'Lorem ipsum dolor sit amet.',
  technologiesUsed: ['Jest'],
  sourceLink: 'http://example.com',
  liveLink: null,
  landingImage: 'https://place-hold.it/640x480',
  galleryImages: [
    'https://place-hold.it/640x480',
    'https://place-hold.it/640x480',
    'https://place-hold.it/640x480',
  ],
};

// Test Suite
describe('ProjectDetail page', () => {
  it('should render all the details of a given project, including its live link if it has one', () => {
    // Create test render
    const renderer = TestRenderer.create(<ProjectDetail project={projectA} />);

    // Expect render to match associated snapshot
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it("should render all the details of a given project, save for its live link if it doesn't have one", () => {
    // Create test render
    const renderer = TestRenderer.create(<ProjectDetail project={projectB} />);

    // Expect render to match associated snapshot
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render project details', () => {
    // Render component
    const { getAllByAltText, getAllByTestId, getByRole, queryByText } = render(
      <ProjectDetail project={projectA} />
    );

    // Retrieve project detail elements
    const heading = queryByText(projectA.name);
    const description = queryByText(projectA.description);
    const technologyItems = getAllByTestId('project-technology');
    const liveLink = getByRole('link', { name: 'live-link' });
    const sourceLink = getByRole('link', { name: 'live-link' });
    const galleryImages = getAllByAltText(/Gallery image for/);

    // Expect header and description elements to exist in the docment
    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    // Expect technology and gallery images to match length of corresponding project items
    expect(technologyItems).toHaveLength(projectA.technologiesUsed.length);
    expect(galleryImages).toHaveLength(projectA.galleryImages.length);

    // For each technology item,
    technologyItems.forEach((techItem, index) => {
      // Get corresponding technology
      const technologies = projectA.technologiesUsed[index];

      // Expect each technology item to contain name of technology
      expect(techItem).toHaveTextContent(technologies);
    });

    // Expect live and source links to have correct hrefs
    expect(liveLink).toHaveAttribute('href', projectA.liveLink);
    expect(sourceLink).toHaveAttribute('href', projectA.sourceLink);

    // For each gallery image,
    galleryImages.forEach((galleryImage, index) => {
      // Get corresponding expected URL
      const galleryImageUrl = projectA.galleryImages[index];

      // Expect gallery image to have correct source URL
      expect(galleryImage).toHaveAttribute('src', galleryImageUrl);
    });
  });
});
