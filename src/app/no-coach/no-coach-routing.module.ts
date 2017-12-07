import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoCoachLandingComponent } from './no-coach-landing/no-coach-landing.component';

const routes: Routes = [
  {
    path: '', component: NoCoachLandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoCoachRoutingModule { }
