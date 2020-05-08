import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from './project.service';
import { PortfolioComponent } from './portfolio/portfolio.component';

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
