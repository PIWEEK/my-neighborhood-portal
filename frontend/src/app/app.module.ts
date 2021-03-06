import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxAliasModule } from 'ngx-alias';

import { AppRoutingModule } from './app-routing.module';
import { DataModule } from './data/data.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { EntityComponent } from './entity/entity.component';
import { NeighborhoodComponent } from './neighborhood/neighborhood.component';
import { CouncilComponent } from './council/council.component';
import { PlanComponent } from './plan/plan.component';
import { SocialCardComponent } from './social-card/social-card.component';
import { StripHtmlPipe } from './strip-html.pipe';

import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SocialCardComponent,
    StripHtmlPipe,
    FilterPanelComponent,
    EntityComponent,
    NeighborhoodComponent,
    CouncilComponent,
    PlanComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DataModule,
    NgxAliasModule,
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
