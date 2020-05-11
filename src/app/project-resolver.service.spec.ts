// Imports
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import * as faker from 'faker';
import range from 'lodash/range';
import { defer, PartialObserver } from 'rxjs';

import { Project } from './project';
import { ProjectResolverService } from './project-resolver.service';
import { ProjectService } from './project.service';

// Test Suite
describe('ProjectResolverService', () => {
    let service: ProjectResolverService;
    let projectService: jasmine.SpyObj<ProjectService>;
    let router: jasmine.SpyObj<Router>;
    let project: Project;
    let activatedRouteSnapshot: ActivatedRouteSnapshot;

    beforeEach(() => {
        // Generate fake project data
        project = Project.fromJsonData({
            id: faker.random.number(50),
            project_name: faker.random.words(3),
            description: faker.lorem.paragraph(),
            technologies: ['Faker', 'Lodash', 'Jasmine', 'Karma'],
            live_link: faker.internet.url(),
            github_link: faker.internet.url(),
            image_urls: {
                landing: faker.random.image(),
                gallery: range(0, 4).map(() => faker.random.image()),
            },
        });

        // Setup fake ActivatedRouteSnapshot
        const paramMap = new Map<string, unknown>();
        paramMap.set('id', project.id);

        activatedRouteSnapshot = { paramMap } as any;

        // Create ProjectService spy
        const projectServiceSpy = jasmine.createSpyObj<ProjectService>(
            'Project',
            ['getById']
        );

        // Create router spy
        const routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

        // Configure testing module
        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useValue: routerSpy },
                { provide: ProjectService, useValue: projectServiceSpy },
            ],
        });

        // Get injected ProjectService and Router
        projectService = TestBed.inject(ProjectService) as jasmine.SpyObj<
            ProjectService
        >;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

        // Setup ProjectService getById method to return fake project data
        projectService.getById.and.returnValue(
            defer(() => Promise.resolve(project))
        );

        // Setup Router navigate method to function normally
        router.navigate.and.callThrough();

        // Get service under test
        service = TestBed.inject(ProjectResolverService);
    });

    describe('.resolve()', () => {
        it('should return project data from project service if found', (done) => {
            // Create observer
            const observer: PartialObserver<Project> = {
                next(recievedProject) {
                    // Expect recieved project to make fake project data
                    expect(recievedProject).toEqual(project);
                },
                complete() {
                    // Expect getById method on ProjectService to have been called with project id
                    expect(projectService.getById).toHaveBeenCalledWith(
                        project.id
                    );

                    // Expect navigate method on Router to have not been called
                    expect(router.navigate).not.toHaveBeenCalled();

                    // Complete test
                    done();
                },
                error(err) {
                    // Fail test with given error
                    fail(err);
                },
            };

            // Invoke resolve method on service and subscribe to result
            service.resolve(activatedRouteSnapshot).subscribe(observer);
        });

        it('should navigate to portfolio page if project was not found with id', (done) => {
            // Set up ProjectService getById method to simulate project not being found
            projectService.getById.and.returnValue(
                defer(() => Promise.resolve(undefined))
            );

            // Create observer
            const observer: PartialObserver<Project> = {
                complete() {
                    // Expect getById method on ProjectService to have been called with project id
                    expect(projectService.getById).toHaveBeenCalledWith(
                        project.id
                    );

                    // Expect Router to have navigated to portfolio page
                    expect(router.navigate).toHaveBeenCalledWith(['/projects']);

                    // Complete test
                    done();
                },
                error(err) {
                    // Fail test with given error
                    fail(err);
                },
            };

            // Invoke resolve method on service and subscribe to result
            service.resolve(activatedRouteSnapshot).subscribe(observer);
        });
    });
});
