// Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

// Routes
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/projects',
    },
    {
        path: 'projects',
        pathMatch: 'full',
        component: PortfolioComponent,
    },
    {
        path: 'projects/:id',
        pathMatch: 'full',
        component: ProjectDetailComponent,
    },
];

// Routing module
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            initialNavigation: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
