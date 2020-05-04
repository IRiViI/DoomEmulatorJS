import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { EmulatingDoomPageComponent } from './pages/emulating-doom-page/emulating-doom-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo:'/projects', pathMatch:'full' },
  { path: 'projects', component: ProjectsPageComponent ,
  children: [
      { path: '', redirectTo:'list', pathMatch:'full' },
      { path: 'doom', component: EmulatingDoomPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
