// Imports
import ProjectApi from '../ProjectApi';

// TODO: Rewrite tests

// Test Suite
describe('Project service', () => {
  console.log(ProjectApi);
  describe('.getList', () => {
    it.todo('should return a non-empty project listing');
  });

  describe('.get', () => {
    it.todo(
      'should return the data for a project if one with the given ID exists'
    );

    it.todo('should return undefined if no project exists with the given ID');
  });
});
