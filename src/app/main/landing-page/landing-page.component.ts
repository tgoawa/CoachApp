import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../core/teamMember/team-member';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  teamMember: TeamMember;
  userName: string;

  constructor(private activatedRoute: ActivatedRoute,
    private tmService: TeamMemberService) { }

  ngOnInit() {
    // this.teamMember = this.activatedRoute.snapshot.data['teamMemberData'];
    // console.log(this.activatedRoute.snapshot.data['teamMemberData']);
    // this.teamMember = this.tmService.getTeamMember(Cookie.get('user'));
    this.tmService.defaultTeamMember = this.teamMember;
  }

}
