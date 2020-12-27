// Imports
import type { AssetReference } from './api';

// Interface
interface Project {
  id: string;
  name: string;
  description: string;
  technologiesUsed: string[];
  liveLink: string | null;
  sourceLink: string;
  landingImage: string;
  galleryImages: string[];
}

// API types
interface ApiProject
  extends Omit<Project, 'id' | 'landingImage' | 'galleryImages'> {
  landingImage: AssetReference;
  galleryImages: AssetReference[];
}

// Exports
export default Project;
export type { ApiProject };
