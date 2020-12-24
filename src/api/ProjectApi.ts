// Imports
import { defer, Observable, of } from 'rxjs';

import { projects as projectData } from '@/../data.json';
import Project from '@/models/Project';

// Project data
const projects: Project[] = projectData.map((project) => ({
  id: project.id,
  name: project.project_name,
  description: project.description,
  technologiesUsed: project.technologies,
  liveLink: project.live_link ?? null,
  sourceLink: project.github_link,
  landingImage: project.image_urls.landing,
  galleryImages: project.image_urls.gallery,
}));

// Service
class ProjectApi {
  public static getList(): Observable<Project[]> {
    return defer(() => of(projects));
  }

  public static get(id: number): Observable<Project | undefined> {
    return defer(() => of(projects.find((project) => project.id === id)));
  }
}

// Exports
export default ProjectApi;
