// Imports
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { projects as projectData } from 'data.json';
import { Project } from './project';

// Service
@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private readonly projects = projectData.map((project) =>
        Project.fromJsonData(project)
    );

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
