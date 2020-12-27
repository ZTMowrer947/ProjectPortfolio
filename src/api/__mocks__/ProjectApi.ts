// Imports
import { image, internet, lorem, random } from 'faker';
import { defer, Observable, of } from 'rxjs';

import Project from '@/models/Project';

// Mock data
const projects = Array.from(
  { length: 10 },
  (): Project => ({
    id: random.uuid(),
    name: random.words(3),
    description: lorem.paragraph(),
    technologiesUsed: Array.from({ length: 3 }, () => random.word()),
    liveLink: internet.url(),
    sourceLink: internet.url(),
    landingImage: image.imageUrl(),
    galleryImages: Array.from({ length: 3 }, () => image.imageUrl()),
  })
);

// Mock Service
class ProjectMockApi {
  public static getList(): Observable<Project[]> {
    return defer(() => of(projects));
  }

  public static get(id: string): Observable<Project | undefined> {
    return defer(() => of(projects.find((project) => project.id === id)));
  }
}

// Exports
export default ProjectMockApi;
