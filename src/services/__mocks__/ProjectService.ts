// Imports
import faker from 'faker';

import Project from '../../models/Project';

// Mock data
const projects = Array.from(
    { length: 10 },
    (_, index): Project => ({
        id: index + 1,
        name: faker.random.words(3),
        description: faker.lorem.paragraph(),
        technologies: Array.from({ length: 3 }, () => faker.random.word()),
        liveLink: faker.internet.url(),
        githubLink: faker.internet.url(),
        landingImageUrl: faker.image.imageUrl(),
        galleryImageUrls: Array.from({ length: 3 }, () => faker.image.imageUrl()),
    })
);

// Mock Service
class ProjectMockService {
    public static async getList(): Promise<Project[]> {
        return Promise.resolve(projects);
    }

    public static async get(id: number): Promise<Project | undefined> {
        return Promise.resolve(projects.find((project) => project.id === id));
    }
}

// Exports
export default ProjectMockService;
