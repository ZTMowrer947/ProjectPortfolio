// Imports
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { of } from 'rxjs';

import { projects as projectData } from 'data.json';
import { Project } from './project';

// Service
@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private readonly projects = plainToClass(Project, projectData);

    getList() {
        // Wrap project data inside observable
        return of(this.projects);
    }

    getById(id: number) {
        // Find project by id
        const projectWithId = this.projects.find(
            (project) => project.id === id
        );

        // Wrap project inside observable
        return of(projectWithId);
    }
}
