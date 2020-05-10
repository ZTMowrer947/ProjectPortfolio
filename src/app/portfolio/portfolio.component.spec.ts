// Imports
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import * as faker from 'faker';
import range from 'lodash/range';

import { ActivatedRouteStub } from 'src/testing/activated-route-stub.service';
import { Project } from '../project';
import { PortfolioComponent } from './portfolio.component';

// Test Suite
describe('PortfolioComponent', () => {
    let component: PortfolioComponent;
    let fixture: ComponentFixture<PortfolioComponent>;
    let projects: Project[];

    beforeEach(async () => {
        // Generate fake project data
        projects = range(1, 11).map((id) =>
            Project.fromJsonData({
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
            })
        );

        // Create ActivatedRoute stub
        const activatedRoute = new ActivatedRouteStub(undefined, { projects });

        // Configure testing module
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [PortfolioComponent],
            providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
        }).compileComponents();

        // Create fixture and get component instance
        fixture = TestBed.createComponent(PortfolioComponent);
        component = fixture.componentInstance;
    });

    it('should initialize project data', fakeAsync(() => {
        // Initialize data bindings
        fixture.detectChanges();

        // Perform tick to allow project retrieval to complete
        tick();

        // Detect data changes
        fixture.detectChanges();

        // Expect component to have recieved project data
        expect(component.projects).toEqual(projects);
    }));

    it('should render landing image, name, and link for each project', fakeAsync(() => {
        // Initialize data bindings
        fixture.detectChanges();

        // Perform tick to allow project retrieval to complete
        tick();

        // Detect data changes
        fixture.detectChanges();

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
    }));
});
