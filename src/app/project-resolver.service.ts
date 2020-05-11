// Imports
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { Project } from './project';
import { ProjectService } from './project.service';

// Resolver service
@Injectable({
    providedIn: 'root',
})
export class ProjectResolverService implements Resolve<Project> {
    constructor(
        private projectService: ProjectService,
        private router: Router
    ) {}

    resolve(
        route: ActivatedRouteSnapshot
    ): Observable<Project> | Observable<never> {
        // Extract ID from param map
        const idString = route.paramMap.get('id');
        const id = Number.parseInt(idString, 10);

        // Retrieve project with id
        return this.projectService.getById(id).pipe(
            take(1),
            mergeMap((project) => {
                if (project) {
                    return of(project);
                } else {
                    this.router.navigate(['/projects']);
                    return EMPTY;
                }
            })
        );
    }
}
