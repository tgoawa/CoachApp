import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { TeamMemberResolver } from '../core/teamMember/team-member.resolver';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: {
      teamMemberData: TeamMemberResolver
    },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', loadChildren: './home/home.module#HomeModule'},
      { path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
