import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import * as faker from 'faker';
import range from 'lodash/range';

import { ActivatedRouteStub } from 'src/testing/activated-route-stub.service';
import { Project } from '../project';
import { ProjectDetailComponent } from './project-detail.component';

describe('ProjectDetailComponent', () => {
    let component: ProjectDetailComponent;
    let fixture: ComponentFixture<ProjectDetailComponent>;
    let project: Project;

    beforeEach(async () => {
        // Generate fake project data
        project = Project.fromJsonData({
            id: faker.random.number(50),
            project_name: faker.random.words(3),
            description: faker.lorem.paragraph(),
            technologies: ['Faker', 'Lodash', 'Jasmine', 'Karma'],
            live_link: faker.internet.url(),
            github_link: faker.internet.url(),
            image_urls: {
                landing: faker.random.image(),
                gallery: range(0, 4).map(() => faker.random.image()),
            },
        });

        // Setup ActivatedRoute stub
        const activatedRoute = new ActivatedRouteStub(
            { id: project.id },
            { project }
        );

        // Configure testing module
        await TestBed.configureTestingModule({
            declarations: [ProjectDetailComponent],
            providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
        }).compileComponents();

        // Create fixture and get component instance
        fixture = TestBed.createComponent(ProjectDetailComponent);
        component = fixture.componentInstance;
    });

    it('should initialize project data', fakeAsync(() => {
        // Initialize data bindings
        fixture.detectChanges();

        // Perform tick to allow project retrieval to complete
        tick();

        // Detect data changes
        fixture.detectChanges();

        // Expect project data to be set on component
        expect(component.project).toEqual(project);
    }));

    it('should properly render project details', fakeAsync(() => {
        // Initialize data bindings
        fixture.detectChanges();

        // Perform tick to allow project retrieval to complete
        tick();

        // Detect data changes
        fixture.detectChanges();

        // Get native element of fixtures
        const compiled: HTMLElement = fixture.nativeElement;

        // Get project name heading and description paragraph
        const nameHeading = compiled.querySelector('h1');
        const descriptionP = compiled.querySelector('p');

        // Get list of technologies
        const technologyLis = compiled.querySelectorAll('li');

        // Get live and github links
        const liveLink = compiled.querySelector<HTMLAnchorElement>(
            'a.live-link'
        );
        const githubLink = compiled.querySelector<HTMLAnchorElement>(
            'a.gh-link'
        );

        // Get gallery images
        const images = compiled.querySelectorAll('img');

        // Expect heading and paragraph to respectively contain project name and description
        expect(nameHeading.textContent).toContain(project.name);
        expect(descriptionP.textContent).toContain(project.description);

        // Expect technology list items to correspond to technology array of project
        expect(technologyLis.length).toEqual(project.technologies.length);
        technologyLis.forEach((li, index) => {
            // Get corresponding technology
            const technology = project.technologies[index];

            // Expect li text to contain technology
            expect(li.textContent).toContain(technology);
        });

        // Normalize link hrefs
        const normalizedLiveHref = liveLink.href.replace(/\/$/, '');
        const normalizedGithubHref = githubLink.href.replace(/\/$/, '');

        // Expect link hrefs to correspond with project data
        expect(normalizedLiveHref).toEqual(project.liveLink);
        expect(normalizedGithubHref).toEqual(project.githubLink);

        // Expect gallery images to correspond with project data
        expect(images.length).toEqual(project.galleryImageUrls.length);
        images.forEach((img, index) => {
            // Get corresponding image URL from project
            const expectedUrl = project.galleryImageUrls[index];

            // Expect image source to match expected URL
            expect(img.src).toEqual(expectedUrl);
        });
    }));
});
