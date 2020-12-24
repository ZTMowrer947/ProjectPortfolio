// Interface
interface Project {
  id: number;
  name: string;
  description: string;
  technologiesUsed: string[];
  liveLink: string | null;
  sourceLink: string;
  landingImage: string;
  galleryImages: string[];
}

// Exports
export default Project;
