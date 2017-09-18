import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { TeamMemberResolver } from './core/teamMember/team-member.resolver';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: {
      teamMemberData: TeamMemberResolver
    },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', loadChildren: './home/home.module#HomeModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
