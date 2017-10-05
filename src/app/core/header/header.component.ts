import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamMemberService } from '../teamMember/team-member.service';
import { TeamMember } from '../teamMember/team-member';
import { Observable } from 'rxjs/Observable';

import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  defaultTeamMember$: Observable<TeamMember>;
  emulatedTeamMember$:  Observable<TeamMember>;
  hasAccess$: Observable<Boolean>;

  constructor(private tmService: TeamMemberService, private router: Router) { }

  ngOnInit() {
    this.defaultTeamMember$ = this.tmService.defaultTeamMember$;
    this.emulatedTeamMember$ = this.tmService.emulatedTeamMember$;
    this.hasAccess$ = this.tmService.hasAccess$;
  }

  resetToDefaultTeamMember() {
    this.tmService.resetEmulatedTeamMember();
    this.router.navigate(['/admin']);
    this.tmService.toggleAccess(true);
  }

  onLogout() {
    Cookie.delete('user');
    this.router.navigate(['/login']);
  }

}
