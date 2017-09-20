import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../core/teamMember/team-member';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  teamMember: Observable<TeamMember>;

  constructor(private tmService: TeamMemberService) { }

  ngOnInit() {
    this.teamMember = this.tmService.emulatedTeamMember$;
  }

}
