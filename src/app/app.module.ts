import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectService } from './project.service';

@NgModule({
    declarations: [AppComponent, PortfolioComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        NgbModule,
    ],
    providers: [ProjectService],
    bootstrap: [AppComponent],
})
export class AppModule {}
