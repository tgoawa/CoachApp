import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../core/services/logger.service';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { Observable } from 'rxjs/Observable';
import { TeamMember } from '../../core/teamMember/team-member';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  isAddTeamMember: false;
  selected: string;
  selectedTm: string;
  selectedCoach: TeamMember;
  coachList: TeamMember[];
  teamMemberList: TeamMember[];
  constructor(private tmService: TeamMemberService, private logger: LoggerService) { }

  ngOnInit() {
    this.getTeamMembers();
  }

  getTeamMembers() {
    this.tmService.getTeamMembers()
    .subscribe(data => {
      this.coachList = data;
      this.teamMemberList = data;
      this.logger.log('Team member list retrieved!');
    }, error => {
      this.logger.error('Could not retrieve team member list');
    });
  }

  mapCoach() {
    for (let index = 0; index < this.coachList.length; index++) {
      if (this.selected === this.coachList[index].LastFirstName) {
        this.selectedCoach = this.coachList[index];
      }
    }
  }

}
