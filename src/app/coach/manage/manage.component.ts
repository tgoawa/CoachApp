import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoggerService } from '../../core/services/logger.service';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { Observable } from 'rxjs/Observable';
import { TeamMember } from '../../core/teamMember/team-member';

import * as _ from 'lodash';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  @ViewChild('auto') auto: ElementRef;
  teamMemberControl: FormControl = new FormControl();
  allTeamMembers: TeamMember[];
  associatedTeamMembers: TeamMember[];
  filteredTeamMembers: Observable<TeamMember[]>;
  coaches: TeamMember[] = [];
  selectedCoach: TeamMember;
  constructor(private tmService: TeamMemberService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.getTeamMembers();
  }

  displayName(teamMember: TeamMember) {
    return teamMember ? teamMember.LastFirstName  : teamMember;
  }

  onCoachSelected() {
    this.selectedCoach = new TeamMember();
    this.selectedCoach = this.teamMemberControl.value;
    this.mapTeamMembersToCoach(this.selectedCoach.TeamMemberId);
  }

  private createCoachArray(coachId: number) {
    for (let x = 0; x < this.allTeamMembers.length; x++) {
      if (coachId === this.allTeamMembers[x].TeamMemberId) {
        this.coaches.push(this.allTeamMembers[x]);
      }
    }
  }

  private filter(val: string): TeamMember[] {
    return this.coaches.filter(coach =>
      coach.LastFirstName.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  private createArrayOfCoaches() {
    for (let x = 0; x < this.allTeamMembers.length; x++) {
      if (this.allTeamMembers[x].CoachId !== 0) {
        this.createCoachArray(this.allTeamMembers[x].CoachId);
      }
    }
  }

  private getTeamMembers() {
    this.tmService.getTeamMembers()
    .subscribe(data => {
      this.allTeamMembers = data;
      this.createArrayOfCoaches();
      this.setFilteredTeamMembers();
    }, error => {
      this.logger.error(error);
    });
  }

  private mapTeamMembersToCoach(id: number) {
    this.associatedTeamMembers = [];
    for (let x = 0; x < this.allTeamMembers.length; x++) {
      if (this.allTeamMembers[x].CoachId === id) {
        this.associatedTeamMembers.push(this.allTeamMembers[x]);
      }
    }
  }

  private setFilteredTeamMembers() {
    this.filteredTeamMembers = this.teamMemberControl.valueChanges
      .startWith(null)
      .map(coach => coach && typeof coach === 'object' ? coach.LastFirstName : coach)
      .map(val => val ? this.filter(val) : this.coaches.slice());
  }

}
