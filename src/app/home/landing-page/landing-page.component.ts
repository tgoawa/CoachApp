import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../core/teamMember/team-member';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  teamMember: TeamMember;

  constructor(private activatedRoute: ActivatedRoute,
    private tmService: TeamMemberService) { }

  ngOnInit() {
    this.teamMember = this.activatedRoute.snapshot.data['teamMemberData'];
    this.tmService.defaultTeamMember = this.teamMember;
    this.tmService.setEmulatedTeamMember(this.teamMember);
  }

}
