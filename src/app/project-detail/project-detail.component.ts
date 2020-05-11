import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../project';

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
    project: Project;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        // Get project from route data
        this.activatedRoute.data.subscribe((data: { project: Project }) => {
            this.project = data.project;
        });
    }
}
