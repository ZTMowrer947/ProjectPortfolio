// Imports\
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

import { accessToken, apiBaseUrl } from '@/config';
import type { Asset, Image } from '@/models/api';
import Project, { ApiProject } from '@/models/Project';

// Helper types
type ProjectLinkData = Pick<Project, 'id' | 'name' | 'landingImage'>;

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
    const projects$ = request({
      url: `${apiBaseUrl}/entries?content_type=project&select=sys.id,fields.name,fields.landingImage&order=sys.createdAt`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      responseType: 'json',
    }).pipe(
      // Get response in JSON format with correct typings
      map(({ response }) => response as ProjectResponse),

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
            id: apiProject.sys.id,
            name: apiProject.fields.name,
            landingImage,
          };
        });

        return projects;
      })
    );

    return projects$;
  }

  public static get(id: string): Observable<Project | undefined> {
    // Fetch project data from CMS
    const project$ = request({
      url: `${apiBaseUrl}/entries?content_type=project&sys.id=${id}`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      responseType: 'json',
    }).pipe(
      // Get response in JSON format with correct typings
      map(({ response }) => response as ProjectResponse),

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
          id: apiProject.sys.id,
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
export type { ProjectLinkData, ProjectResponse };
