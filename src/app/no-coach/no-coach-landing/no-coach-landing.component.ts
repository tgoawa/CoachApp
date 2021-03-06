import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { LoggerService } from '../../core/services/logger.service';
import { TeamMember } from '../../core/teamMember/team-member';

@Component({
  selector: 'app-no-coach-landing',
  templateUrl: './no-coach-landing.component.html',
  styleUrls: ['./no-coach-landing.component.scss']
})
export class NoCoachLandingComponent implements OnInit {
  teamMembers: TeamMember[];
  noCoachList: TeamMember[];

  constructor(private tmService: TeamMemberService, private logger: LoggerService) { }

  ngOnInit() {
    this.getTeamMembers();
  }

  private getTeamMembers() {
    this.tmService.getTeamMembers().subscribe(
      data => {
        this.teamMembers = data;
        this.noCoachList = this.noCoach(this.teamMembers);
        this.logger.log('team members retrieved!');
      },
      error => {
        this.logger.error(error);
      }
    );
  }

  private noCoach(teamMemberList: TeamMember[]) {
    const list = [];
    for (let x = 0; x < teamMemberList.length; x++) {
      if (teamMemberList[x].CoachFirstName === null) {
        list.push(teamMemberList[x]);
      }
    }
    return list;
  }

}
