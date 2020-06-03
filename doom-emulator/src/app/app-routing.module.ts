import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { EmulatingDoomPageComponent } from './pages/emulating-doom-page/emulating-doom-page.component';
import { DoomSlidersPageComponent } from './pages/doom-sliders-page/doom-sliders-page.component';
// import { NotMyStarterSixPageComponent } from './pages/not-my-starter-six-page/not-my-starter-six-page.component';
import { NotAPokemonGeneratorPageComponent } from './pages/not-a-pokemon-generator-page/not-a-pokemon-generator-page.component';
import { NotPokedexPageComponent } from './pages/not-pokedex-page/not-pokedex-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProjectsHomePageComponent } from './pages/projects-home-page/projects-home-page.component';
import { TestsPageComponent } from './pages/tests-page/tests-page.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo:'/home', pathMatch:'full' },
  { path: 'projects', component: ProjectsPageComponent ,
  children: [
      { path: '', redirectTo:'home', pathMatch:'full' },
      { path: 'home', component: ProjectsHomePageComponent },
      { path: 'doom', component: EmulatingDoomPageComponent },
      { path: 'doom-sliders', component: DoomSlidersPageComponent },
      // { path: 'not-my-starter-six', component: NotMyStarterSixPageComponent },
      { path: 'not-a-pokemon-generator', component: NotAPokemonGeneratorPageComponent },
      { path: 'not-pokedex', component: NotPokedexPageComponent },
    ]
  },
  { path: 'tests', component: TestsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
