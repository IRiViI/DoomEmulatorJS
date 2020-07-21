import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthInterceptor } from "./auth/auth.interceptor"; 

import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { EmulatingDoomPageComponent } from './pages/emulating-doom-page/emulating-doom-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectsHomePageComponent } from './pages/projects-home-page/projects-home-page.component';
import { DoomSlidersPageComponent } from './pages/doom-sliders-page/doom-sliders-page.component';
import { NotMyStarterSixPageComponent } from './pages/not-my-starter-six-page/not-my-starter-six-page.component';
import { PokemonCardComponent } from './pokemons/pokemon-card/pokemon-card.component';
import { NotAPokemonGeneratorPageComponent } from './pages/not-a-pokemon-generator-page/not-a-pokemon-generator-page.component';
import { NotPokedexPageComponent } from './pages/not-pokedex-page/not-pokedex-page.component';
import { TestsPageComponent } from './pages/tests-page/tests-page.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header/header.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { EditNotPokemonPageComponent } from './pages/edit-not-pokemon-page/edit-not-pokemon-page.component';
import { RecipesHomePageComponent } from './pages/recipes-home-page/recipes-home-page.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';


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
    NotMyStarterSixPageComponent,
    PokemonCardComponent,
    NotAPokemonGeneratorPageComponent,
    NotPokedexPageComponent,
    TestsPageComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    AuthPageComponent,
    EditNotPokemonPageComponent,
    RecipesHomePageComponent,
    RecipesPageComponent,
    RecipePageComponent,
  ],
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressBarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
