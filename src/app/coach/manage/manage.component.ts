import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('auto') auto: ElementRef;
  teamMemberControl: FormControl = new FormControl();
  allCoachTeamMembers: CoachTeamMember[];
  associatedTeamMembers: CoachTeamMember[];
  uniqueCoaches: CoachTeamMember[];
  filteredTeamMembers: Observable<CoachTeamMember[]>;
  selectedCoach: CoachTeamMember;

  constructor(private tmService: TeamMemberService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.getCoachTeamMembers();
  }

  displayName(teamMember: CoachTeamMember) {
    return teamMember ? teamMember.CoachLastName + ', ' + teamMember.CoachFirstName : teamMember;
  }

  onCoachSelected() {
    this.selectedCoach = new CoachTeamMember();
    this.selectedCoach = this.teamMemberControl.value;
    this.mapTeamMembersToCoach(this.selectedCoach.CoachId);
  }

  private filter(val: string): CoachTeamMember[] {
    return this.uniqueCoaches.filter(coach =>
      coach.CoachLastName.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  private getCoachTeamMembers() {
    this.tmService.getCoachesTeamMembers()
    .subscribe(data => {
      this.allCoachTeamMembers = data;
      this.uniqueCoaches = _.uniqBy(this.allCoachTeamMembers, 'CoachId');
      this.uniqueCoaches = _.sortBy(this.uniqueCoaches, 'CoachLastName');
      this.setFilteredTeamMembers();
    }, error => {
      this.logger.error(error);
    });
  }

  private mapTeamMembersToCoach(id: number) {
    this.associatedTeamMembers = [];
    for (let x = 0; x < this.allCoachTeamMembers.length; x++) {
      if (this.allCoachTeamMembers[x].CoachId === id) {
        this.associatedTeamMembers.push(this.allCoachTeamMembers[x]);
      }
    }
  }

  private setFilteredTeamMembers() {
    this.filteredTeamMembers = this.teamMemberControl.valueChanges
      .startWith(null)
      .map(coach => coach && typeof coach === 'object' ? coach.CoachLastName : coach)
      .map(val => val ? this.filter(val) : this.uniqueCoaches.slice());
  }

}
