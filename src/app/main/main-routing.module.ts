import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: LandingPageComponent },
      { path: 'admin', loadChildren: '../admin/admin.module#AdminModule'},
      { path: 'coach', loadChildren: '../coach/coach.module#CoachModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
