import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { DataModule } from './data/data.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PlanComponent } from './plan/plan.component';
import { CouncilComponent } from './council/council.component';
import { SocialCardComponent } from './social-card/social-card.component';

import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PlanComponent,
    CouncilComponent,
    SocialCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }