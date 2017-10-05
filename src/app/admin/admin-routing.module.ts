import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminEntryComponent } from './admin-entry/admin-entry.component';
import { NoAccessComponent } from './no-access/no-access.component';

const routes: Routes = [
  {
    path: '', component: AdminEntryComponent
  },
  {
    path: 'admin-no-access', component: NoAccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
