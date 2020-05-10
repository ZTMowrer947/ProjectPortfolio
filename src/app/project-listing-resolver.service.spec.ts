// Imports
import { TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import range from 'lodash/range';
import { defer, from, of, PartialObserver } from 'rxjs';

import { Project } from './project';
import { ProjectListingResolverService } from './project-listing-resolver.service';
import { ProjectService } from './project.service';

// Test Suite
describe('ProjectListingResolverService', () => {
    let service: ProjectListingResolverService;
    let projectService: jasmine.SpyObj<ProjectService>;
    let projects: Project[];

    beforeEach(() => {
        // Generate fake project listing
        projects = range(1, 11).map((id) =>
            Project.fromJsonData({
                id,
                project_name: faker.random.words(3),
                description: faker.lorem.paragraph(),
                technologies: ['Faker', 'Lodash', 'Jasmine', 'Karma'],
                live_link: faker.internet.url(),
                github_link: faker.internet.url(),
                image_urls: {
                    landing: faker.random.image(),
                    gallery: range(0, 4).map(() => faker.random.image()),
                },
            })
        );

        // Create ProjectService spy
        const projectServiceSpy = jasmine.createSpyObj<ProjectService>(
            'Project',
            ['getList']
        );

        // Configure testing module
        TestBed.configureTestingModule({
            providers: [
                { provide: ProjectService, useValue: projectServiceSpy },
            ],
        });

        // Get injected ProjectService
        projectService = TestBed.inject(ProjectService) as jasmine.SpyObj<
            ProjectService
        >;

        // Setup ProjectService getList method to return fake project listing
        projectService.getList.and.returnValue(
            defer(() => Promise.resolve(projects))
        );

        // Get service under test
        service = TestBed.inject(ProjectListingResolverService);
    });

    describe('.resolve()', () => {
        it('should return project listing from project service', (done) => {
            // Create observer
            const observer: PartialObserver<Project[]> = {
                next(recievedProjects) {
                    // Expect getList method to be called on ProjectService
                    expect(projectService.getList).toHaveBeenCalled();

                    // Expect recieved project listing to match generated listing
                    expect(recievedProjects).toEqual(projects);

                    // Complete test
                    done();
                },
                error(err) {
                    // Fail test with given error
                    fail(err);
                },
            };

            // Invoke resolve method on service
            const result = service.resolve();

            // Convert into observable
            const result$ = Array.isArray(result) ? of(result) : from(result);

            // Subscribe using observer
            result$.subscribe(observer);
        });
    });
});
