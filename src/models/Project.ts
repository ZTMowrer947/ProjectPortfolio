// Interface
interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  liveLink: string | null;
  githubLink: string;
  landingImageUrl: string;
  galleryImageUrls: string[];
}

// Exports
export default Project;
