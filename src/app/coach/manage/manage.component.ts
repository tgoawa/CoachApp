import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoggerService } from '../../core/services/logger.service';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { Observable } from 'rxjs/Observable';
import { TeamMember } from '../../core/teamMember/team-member';
import { CoachTeamMember } from '../../core/models/coach-team-member';

import * as _ from 'lodash';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  teamMemberControl: FormControl = new FormControl();
  allCoachTeamMembers: CoachTeamMember[];
  uniqueCoaches: CoachTeamMember[] = [];
  constructor(private tmService: TeamMemberService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.getCoachTeamMembers();
  }

  getCoachTeamMembers() {
    this.tmService.getCoachesTeamMembers()
    .subscribe(data => {
      this.allCoachTeamMembers = data;
      this.uniqueCoaches = _.uniqBy(this.allCoachTeamMembers, 'CoachId');
      console.log(this.uniqueCoaches);
    }, error => {
      this.logger.error(error);
    });
  }

}
