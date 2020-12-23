// Imports
import { render } from '@testing-library/react';

import Portfolio from '../../../pages/projects';
import ProjectService from '../../../services/ProjectService';

// Jest mocks
jest.mock('../../../services/ProjectService');

// Test Suite
describe('<Portfolio>', () => {
  it('should render a list of project items', async () => {
    // Get mock project listing
    const projects = await ProjectService.getList();

    // Render component
    const { getByText, getAllByTestId } = render(
      <Portfolio projects={projects} />
    );

    // Get all project items
    const projectItems = getAllByTestId('project-item');

    // Expect there to be a project item for each project
    expect(projectItems).toHaveLength(projects.length);

    // For each project item,
    projectItems.forEach((projectItem, index) => {
      // Get corresponding project
      const project = projects[index];

      // Get project link, title, and landingImage
      const projectLink = projectItem.querySelector('a');
      const projectTitle = getByText(project.name);
      const projectLandingImage = projectItem.querySelector('img');

      /* eslint-disable @typescript-eslint/no-unsafe-call */

      // Expect all three to exist and be in the document
      expect(projectLink).toBeInTheDocument();
      expect(projectTitle).toBeInTheDocument();
      expect(projectLandingImage).toBeInTheDocument();

      // Expect link href to end with project ID
      expect(projectLink).toHaveAttribute(
        'href',
        expect.stringMatching(new RegExp(`${project.id}$`))
      );

      // Expect image source to match landing image URL for project
      expect(projectLandingImage).toHaveAttribute(
        'src',
        project.landingImageUrl
      );

      /* eslint-enable @typescript-eslint/no-unsafe-call */
    });
  });
});
