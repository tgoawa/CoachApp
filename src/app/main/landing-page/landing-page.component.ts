import { Component, OnInit } from '@angular/core';

import { TeamMemberCoachModel } from '../../core/models/coach-team-member';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { LoggerService } from '../../core/services/logger.service';
import { TeamMember } from '../../core/teamMember/team-member';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  teamMembers: TeamMember[];

  constructor(
    private tmService: TeamMemberService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.getTeamMembers();
  }

  private getTeamMembers() {
    this.tmService.getTeamMembers().subscribe(
      data => {
        this.teamMembers = data;
        this.logger.log('team members retrieved!');
      },
      error => {
        this.logger.error(error);
      }
    );
  }

}
