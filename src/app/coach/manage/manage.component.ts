import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoggerService } from '../../core/services/logger.service';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { Observable } from 'rxjs/Observable';
import { TeamMember } from '../../core/teamMember/team-member';
import { CoachTeamMember } from '../../core/models/coach-team-member';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  teamMemberControl: FormControl = new FormControl();
  allCoachTeamMembers: CoachTeamMember;
  uniqueCoaches: CoachTeamMember[];
  constructor(private tmService: TeamMemberService,
    private logger: LoggerService) { }

  ngOnInit() {

  }

  getCoachTeamMembers() {
    this.tmService.getCoachesTeamMembers()
    .subscribe(data => {
      this.allCoachTeamMembers = data;
      this.createCoachArray(data);
    }, error => {
      this.logger.error(error);
    });
  }

  private createCoachArray(data: CoachTeamMember[]) {
    for (let x = 0; x < data.length; x++) {
      if (this.uniqueCoaches[x].CoachId === data[x].CoachId) {
        continue;
      } else {
        this.uniqueCoaches.push(data[x]);
      }
    }
  }

}
