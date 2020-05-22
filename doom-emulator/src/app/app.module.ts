import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { EmulatingDoomPageComponent } from './pages/emulating-doom-page/emulating-doom-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectsHomePageComponent } from './pages/projects-home-page/projects-home-page.component';
import { DoomSlidersPageComponent } from './pages/doom-sliders-page/doom-sliders-page.component';
import { NotMyStarterSixPageComponent } from './pages/not-my-starter-six-page/not-my-starter-six-page.component';

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'www.ricksprojects.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};

@NgModule({
  declarations: [
    AppComponent,
    ProjectsPageComponent,
    EmulatingDoomPageComponent,
    HomePageComponent,
    ProjectsHomePageComponent,
    DoomSlidersPageComponent,
    NotMyStarterSixPageComponent
  ],
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
