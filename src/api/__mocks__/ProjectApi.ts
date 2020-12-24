// Imports
import faker from 'faker';
import { defer, Observable, of } from 'rxjs';

import Project from '@/models/Project';

// Mock data
const projects = Array.from(
  { length: 10 },
  (_, index): Project => ({
    id: index + 1,
    name: faker.random.words(3),
    description: faker.lorem.paragraph(),
    technologiesUsed: Array.from({ length: 3 }, () => faker.random.word()),
    liveLink: faker.internet.url(),
    sourceLink: faker.internet.url(),
    landingImage: faker.image.imageUrl(),
    galleryImages: Array.from({ length: 3 }, () => faker.image.imageUrl()),
  })
);

// Mock Service
class ProjectMockApi {
  public static getList(): Observable<Project[]> {
    return defer(() => of(projects));
  }

  public static get(id: number): Observable<Project | undefined> {
    return defer(() => of(projects.find((project) => project.id === id)));
  }
}

// Exports
export default ProjectMockApi;
