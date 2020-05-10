import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../project';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
    projects: Project[] = [];

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        // Recieve project listing from route data
        this.activatedRoute.data.subscribe((data: { projects: Project[] }) => {
            this.projects = data.projects;
        });
    }
}
