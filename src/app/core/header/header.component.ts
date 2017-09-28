import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../teamMember/team-member.service';
import { TeamMember } from '../teamMember/team-member';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  defaultTeamMember$: Observable<TeamMember>;
  emulatedTeamMember$:  Observable<TeamMember>;

  constructor(private tmService: TeamMemberService) { }

  ngOnInit() {
    this.defaultTeamMember$ = this.tmService.defaultTeamMember$;
    this.emulatedTeamMember$ = this.tmService.emulatedTeamMember$;
  }

  resetToDefaultTeamMember() {
    this.tmService.resetEmulatedTeamMember();
  }

}
