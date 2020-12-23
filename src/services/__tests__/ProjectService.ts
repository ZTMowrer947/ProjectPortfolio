// Imports
import ProjectService from '../ProjectService';

// Test Suite
describe('Project service', () => {
  describe('.getList', () => {
    it('should return a non-empty project listing', async () => {
      // Get project listing
      const projects = await ProjectService.getList();

      // Expect array length to be nonzero
      expect(projects.length).toBeGreaterThan(0);
    });
  });

  describe('.get', () => {
    it('should return the data for a project if one with the given ID exists', async () => {
      // Define ID to test
      const id = 1;

      // Expect project to exist with given ID
      return expect(ProjectService.get(id)).resolves.toBeDefined();
    });

    it('should return undefined if no project exists with the given ID', async () => {
      // Define ID to test
      const id = Number.MAX_SAFE_INTEGER;

      // Expect project NOT to exist with given ID
      return expect(ProjectService.get(id)).resolves.toBeUndefined();
    });
  });
});
