import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Project } from './project';
import { ProjectService } from './project.service';

// Resolver service
@Injectable({
    providedIn: 'root',
})
export class ProjectListingResolverService implements Resolve<Project[]> {
    constructor(private projectService: ProjectService) {}

    resolve(): Project[] | Observable<Project[]> | Promise<Project[]> {
        // Retrieve project listing from service
        return this.projectService.getList().pipe(take(1));
    }
}
