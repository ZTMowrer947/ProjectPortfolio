// Imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { plainToClass } from 'class-transformer';
import * as faker from 'faker';
import range from 'lodash/range';
import { Observable, of } from 'rxjs';

import { Project } from '../project';
import { ProjectService } from '../project.service';
import { PortfolioComponent } from './portfolio.component';

// Test Suite
describe('PortfolioComponent', () => {
    let component: PortfolioComponent;
    let fixture: ComponentFixture<PortfolioComponent>;
    let projects: Project[];
    let getListSpy: jasmine.Spy<() => Observable<Project[]>>;

    beforeEach(async () => {
        // Generate fake project data
        projects = range(1, 11)
            .map((id) => ({
                id,
                project_name: faker.random.words(3),
                description: faker.lorem.paragraph(),
                technologies: ['Faker', 'Lodash', 'Jasmine', 'Karma'],
                live_link: faker.internet.url(),
                github_link: faker.internet.url(),
                image_urls: {
                    landing: faker.random.image(),
                    gallery: range(0, 4).map(() => faker.random.image()),
                },
            }))
            .map((data) => plainToClass(Project, data));

        // Create project service spy
        const projectServiceSpy = jasmine.createSpyObj<ProjectService>(
            'ProjectService',
            ['getList']
        );

        // Setup getList method on spy to return fake project listing
        getListSpy = projectServiceSpy.getList.and.returnValue(of(projects));

        // Configure testing module
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [PortfolioComponent],
            providers: [
                { provide: ProjectService, useValue: projectServiceSpy },
            ],
        }).compileComponents();

        // Create fixture and get component instance
        fixture = TestBed.createComponent(PortfolioComponent);
        component = fixture.componentInstance;

        // Detect data changes
        fixture.detectChanges();
    });

    it('should initialize project data', () => {
        // Expect getList method on project service to have been called
        expect(getListSpy).toHaveBeenCalled();

        // Expect component to have recieved project data
        expect(component.projects).toEqual(projects);
    });

    it('should render landing image, name, and link for each project', () => {
        // Get native element of fixture
        const compiled: HTMLElement = fixture.nativeElement;

        // Query all project list items
        const lis = compiled.querySelectorAll<HTMLLIElement>(
            '.portfolio-index li'
        );

        // Expect there to be a list item for each project
        expect(lis.length).toEqual(projects.length);

        // For each list item
        lis.forEach((li, index) => {
            // Get corresponding project data
            const project = projects[index];

            // Get anchor element
            const a = li.querySelector('a');

            // Expect href to end with project id
            expect(a.href).toMatch(new RegExp(`${project.id}$`));

            // Get img and span elements
            const img = a.querySelector('img');
            const span = a.querySelector('span');

            // Expect image source to match landing image URL of project
            expect(img.src).toEqual(project.landingImageUrl);

            // Expect span text to contain project name
            expect(span.textContent).toContain(project.name);
        });
    });
});
