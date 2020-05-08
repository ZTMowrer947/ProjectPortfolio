import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
    project: Project;

    constructor(
        private activatedRoute: ActivatedRoute,
        private projectService: ProjectService
    ) {}

    ngOnInit(): void {
        // Get id from param map and fetch project using that id
        this.activatedRoute.paramMap
            .pipe(
                map((paramMap) => Number.parseInt(paramMap.get('id'), 10)),
                mergeMap((id) => this.projectService.getById(id))
            )
            .subscribe((project) => {
                this.project = project;
            });
    }
}
