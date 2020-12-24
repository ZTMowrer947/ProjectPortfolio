// Imports
import fetch from 'isomorphic-unfetch';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { accessToken, apiBaseUrl } from '@/config';
import Project from '@/models/Project';

// Helper types
type ProjectLinkData = Pick<Project, 'id' | 'name' | 'landingImage'>;

interface AssetReference {
  sys: {
    id: string;
  };
}

interface Asset<Fields> extends AssetReference {
  fields: Fields;
}

interface ApiProject extends Omit<Project, 'landingImage' | 'galleryImages'> {
  landingImage: AssetReference;
  galleryImages: AssetReference[];
}

type Image = Asset<{
  file: {
    url: string;
  };
}>;

interface ProjectResponse {
  items: Asset<ApiProject>[];
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
      mergeMap((res) => from<Promise<ProjectResponse>>(res.json())),

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

          // Create project link object
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
    // Fetch project data from CMS
    const project$ = from(
      fetch(`${apiBaseUrl}/entries?content_type=project&fields.id=${id}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
    ).pipe(
      // Get response in JSON format
      mergeMap((res) => from<Promise<ProjectResponse>>(res.json())),

      // Convert API data into application format
      map((data) => {
        // If project was not found, return undefined
        if (data.items.length === 0) return undefined;

        // Otherwise, retrieve project data
        const apiProject = data.items[0];

        // Search for image matching landing image ID
        const apiLandingImage = data.includes.Asset.find(
          (asset) => asset.sys.id === apiProject.fields.landingImage.sys.id
        )!;

        // Get gallery images matching image ID
        const apiGalleryImages = data.includes.Asset.filter((asset) =>
          apiProject.fields.galleryImages.some(
            (img) => img.sys.id === asset.sys.id
          )
        );

        // Generate URLs for images
        const landingImage = `https:${apiLandingImage.fields.file.url}`;
        const galleryImages = apiGalleryImages.map(
          (img) => `https:${img.fields.file.url}`
        );

        // Generate project from API data
        const project: Project = {
          id: apiProject.fields.id,
          name: apiProject.fields.name,
          description: apiProject.fields.description,
          technologiesUsed: apiProject.fields.technologiesUsed,
          sourceLink: apiProject.fields.sourceLink,
          liveLink: apiProject.fields.liveLink ?? null,
          landingImage,
          galleryImages,
        };

        return project;
      })
    );

    return project$;
  }
}

// Exports
export default ProjectApi;
export type { ProjectLinkData };
