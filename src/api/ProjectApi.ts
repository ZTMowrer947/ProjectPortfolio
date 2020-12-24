// Imports
import fetch from 'isomorphic-unfetch';
import { defer, from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { projects as projectData } from '@/../data.json';
import { accessToken, apiBaseUrl } from '@/config';
import Project from '@/models/Project';

// Project data
const jsonProjects: Project[] = projectData.map((project) => ({
  id: project.id,
  name: project.project_name,
  description: project.description,
  technologiesUsed: project.technologies,
  liveLink: project.live_link ?? null,
  sourceLink: project.github_link,
  landingImage: project.image_urls.landing,
  galleryImages: project.image_urls.gallery,
}));

// Helper types
type ProjectLinkData = Pick<Project, 'id' | 'name' | 'landingImage'>;

interface ApiProject extends Omit<ProjectLinkData, 'landingImage'> {
  landingImage: {
    sys: {
      id: string;
    };
  };
}

interface Image {
  sys: {
    id: string;
  };
  fields: {
    file: {
      url: string;
    };
  };
}

interface ProjectListResponse {
  items: { fields: ApiProject }[];
  includes: {
    Asset: Image[];
  };
}

// Service
class ProjectApi {
  public static getList(): Observable<ProjectLinkData[]> {
    // Fetch project data from CMS
    const projects$ = from(
      fetch(
        `${apiBaseUrl}/entries?content_type=project&select=fields.id,fields.name,fields.landingImage`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
    ).pipe(
      // Get response in JSON format
      mergeMap((res) => from<Promise<ProjectListResponse>>(res.json())),

      // Convert API data into application format
      map((data) => {
        // Map each API project into app equivalent
        const projects: ProjectLinkData[] = data.items.map((apiProject) => {
          // Search for image matching landing image ID
          const apiLandingImage = data.includes.Asset.find(
            (asset) => asset.sys.id === apiProject.fields.landingImage.sys.id
          )!;

          // Generate URL for landing image
          const landingImage = `https:${apiLandingImage.fields.file.url}`;

          // Create project object
          return {
            id: apiProject.fields.id,
            name: apiProject.fields.name,
            landingImage,
          };
        });

        return projects;
      })
    );

    return projects$;
  }

  public static get(id: number): Observable<Project | undefined> {
    return defer(() => of(jsonProjects.find((project) => project.id === id)));
  }
}

// Exports
export default ProjectApi;
export type { ProjectLinkData };
