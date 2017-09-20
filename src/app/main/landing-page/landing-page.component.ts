import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../core/teamMember/team-member';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  teamMember: TeamMember;
  userName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tmService: TeamMemberService,
    private logger: LoggerService
    ) { }

  ngOnInit() {
    this.userName = Cookie.get('user');
    this.getTeamMember();
  }

  getTeamMember() {
    this.tmService.getTeamMember(this.userName)
      .subscribe(data => {
        this.teamMember = data;
        this.tmService.defaultTeamMember = this.teamMember;
      }, error => {
        this.logger.error(error);
      });
  }

}
