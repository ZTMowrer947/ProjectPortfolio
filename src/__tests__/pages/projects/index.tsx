// Imports
import { render } from '@testing-library/react';
import { random } from 'faker';
import TestRenderer from 'react-test-renderer';

import { ProjectLinkData } from '@/api/ProjectApi';
import Portfolio from '@/pages/projects';

// Test data
const projects: ProjectLinkData[] = Array.from({ length: 3 }, (v, index) => ({
  id: random.uuid(),
  name: `Project #${index + 1}`,
  landingImage: 'https://place-hold.it/640x480',
}));

// Test Suite
describe('Portfolio page', () => {
  it('should render a list of links to projects', () => {
    // Create test render
    const renderer = TestRenderer.create(<Portfolio projects={projects} />);

    // Expect render to match associated snapshot
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render the correct components for each project', () => {
    // Render component
    const { getByAltText, getByRole, queryByText } = render(
      <Portfolio projects={projects} />
    );

    // For each project,
    projects.forEach((project) => {
      // Get project link, title, and landing image
      const link = getByRole('link', { name: `project-${project.id}` });
      const title = queryByText(project.name);
      const landingImage = getByAltText(`Landing image for "${project.name}"`);

      // Expect project title to have been found
      expect(title).not.toBeNull();

      // Expect link href to end with project ID
      expect(link).toHaveAttribute(
        'href',
        expect.stringMatching(new RegExp(`${project.id}$`))
      );

      // Expect image source to match landing image URL for project
      expect(landingImage).toHaveAttribute('src', project.landingImage);
    });
  });
});
