// Imports
import { image, internet, lorem, random } from 'faker';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { apiBaseUrl } from '@/config';
import { Image } from '@/models/api';
import Project, { ApiProject } from '@/models/Project';

import ProjectApi, { ProjectResponse } from '../ProjectApi';

// Mock project data
const projects = Array.from(
  { length: 10 },
  (_, index): Project => ({
    id: index + 1,
    name: random.words(3),
    description: lorem.paragraph(),
    technologiesUsed: Array.from({ length: 3 }, () => random.word()),
    liveLink: internet.url(),
    sourceLink: internet.url(),
    landingImage: image.imageUrl(
      undefined,
      undefined,
      undefined,
      undefined,
      true
    ),
    galleryImages: Array.from({ length: 3 }, () =>
      image.imageUrl(undefined, undefined, undefined, undefined, true)
    ),
  })
);

// Helper functions
function projectToApiProject(project: Project) {
  const landingImage: Image = {
    sys: {
      id: random.uuid(),
    },
    fields: {
      file: {
        url: project.landingImage.substring(project.landingImage.indexOf('//')),
      },
    },
  };

  const galleryImages: Image[] = project.galleryImages.map((galleryImage) => ({
    sys: {
      id: random.uuid(),
    },
    fields: {
      file: {
        url: galleryImage.substring(galleryImage.indexOf('//')),
      },
    },
  }));

  const apiProject: ApiProject = {
    id: project.id,
    name: project.name,
    description: project.description,
    technologiesUsed: project.technologiesUsed,
    sourceLink: project.sourceLink,
    liveLink: project.liveLink,
    landingImage: {
      sys: landingImage.sys,
    },
    galleryImages: galleryImages.map((galleryImage) => ({
      sys: galleryImage.sys,
    })),
  };

  const images = [landingImage, ...galleryImages];

  return {
    apiProject,
    images,
  };
}

// Mock server
const server = setupServer(
  rest.get(`${apiBaseUrl}/entries`, (req, res, ctx) => {
    const { searchParams } = req.url;
    const body: ProjectResponse = {
      items: [],
      includes: {
        Asset: [],
      },
    };

    if (searchParams.has('fields.id')) {
      const id = searchParams.get('fields.id');

      const project = projects.find((proj) => proj.id.toString(10) === id);

      if (project) {
        const { images, apiProject } = projectToApiProject(project);

        const item = {
          sys: {
            id: random.uuid(),
          },
          fields: apiProject,
        };

        body.items.push(item);
        body.includes.Asset.push(...images);
      }
    } else {
      const apiProjectData = projects.map((project) =>
        projectToApiProject(project)
      );

      const items = apiProjectData.map(({ apiProject }) => ({
        sys: {
          id: random.uuid(),
        },
        fields: apiProject,
      }));

      const images = apiProjectData.flatMap(({ images: imgs }) => imgs);

      body.items.push(...items);
      body.includes.Asset.push(...images);
    }

    return res(ctx.status(200), ctx.json(body));
  })
);

// Test Suite
describe('Project service', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('.getList', () => {
    it('should return a non-empty project listing', async () => {
      // Define expected result
      const expected = projects.map((project) => ({
        id: project.id,
        name: project.name,
        landingImage: project.landingImage,
      }));

      // Expect API service to resolve to expected result
      await expect(ProjectApi.getList().toPromise()).resolves.toStrictEqual(
        expected
      );
    });
  });

  describe('.get', () => {
    it('should return the data for a project if one with the given ID exists', async () => {
      // Pull random ID from set of projects
      const randomIndex = Math.floor(Math.random() * projects.length);
      const { id } = projects[randomIndex];

      // Expect API service to resolve to matching project data
      await expect(ProjectApi.get(id).toPromise()).resolves.toStrictEqual(
        projects[randomIndex]
      );
    });

    it('should return undefined if no project exists with the given ID', async () => {
      // Define ID which does not exist in project data
      const id = projects.length * 2;

      // Expect API service to resolve to undefined
      await expect(ProjectApi.get(id).toPromise()).resolves.toBeUndefined();
    });
  });
});
