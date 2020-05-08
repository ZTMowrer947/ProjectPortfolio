// Imports
import { TestBed } from '@angular/core/testing';
import { plainToClass } from 'class-transformer';
import { from, PartialObserver } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { projects as projectData } from 'data.json';
import { Project } from './project';
import { ProjectService } from './project.service';

// Test Suite
describe('ProjectService', () => {
    let service: ProjectService;
    let projects: Project[];

    beforeEach(() => {
        // Initialize project data
        projects = plainToClass(Project, projectData);

        // Configure testing module
        TestBed.configureTestingModule({});

        // Get service under test
        service = TestBed.inject(ProjectService);
    });

    describe('.getList', () => {
        it('should return the correct project listing', (done) => {
            // Create observer
            const observer: PartialObserver<Project[]> = {
                next(result) {
                    // Expect result to match test data
                    expect(result).toEqual(projects);

                    // Complete test
                    done();
                },
                error(err) {
                    // Fail test with given error
                    fail(err);
                },
            };

            // Retrieve project listing from service and observe result
            service.getList().subscribe(observer);
        });
    });

    describe('.getById', () => {
        it('should return data for a single project', (done) => {
            // Store call count
            let callCount = 0;

            // Create observer
            const observer: PartialObserver<[Project, number]> = {
                next([project, index]) {
                    // Expect project matches corresponding test data
                    expect(project).toEqual(projects[index]);

                    // Increment call counter
                    callCount++;
                },
                complete() {
                    // Expect that call count matches length project listing
                    expect(callCount).toEqual(projects.length);

                    // Complete test
                    done();
                },
                error(err) {
                    // Fail test with given error
                    fail(err);
                },
            };

            // Fetch project data for each project in test data
            from(projects)
                .pipe(
                    map((project) => project.id),
                    mergeMap((id, index) => {
                        return service
                            .getById(id)
                            .pipe(map((project) => [project, index]));
                    })
                )
                .subscribe(observer);
        });

        it('should return undefined if project is not found with id', (done) => {
            // Calculate out of bounds id
            const nonexistentId =
                projects.reduce((max, { id }) => (id > max ? id : max), 0) + 1;

            // Create observer
            const observer: PartialObserver<Project> = {
                next(project) {
                    // Expect project to be undefined
                    expect(project).toBeUndefined();

                    // Complete test
                    done();
                },
                error(err) {
                    // Fail test with given error
                    fail(err);
                },
            };

            // Retrieve nonexistent project by id
            service.getById(nonexistentId).subscribe(observer);
        });
    });
});
