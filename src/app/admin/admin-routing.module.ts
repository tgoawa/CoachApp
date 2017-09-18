import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminEntryComponent } from './admin-entry/admin-entry.component';

const routes: Routes = [
  {
    path: '', component: AdminEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
