import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
    projects: Project[] = [];

    constructor(private service: ProjectService) {}

    ngOnInit(): void {
        // Fetch project listing and attach to component
        this.service.getList().subscribe((projects) => {
            this.projects = projects;
        });
    }
}
