// Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioComponent } from './portfolio/portfolio.component';

// Routes
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/projects',
    },
    {
        path: 'projects',
        component: PortfolioComponent,
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
