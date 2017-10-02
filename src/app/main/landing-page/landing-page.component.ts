import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { CoachTeamMember, TeamMemberCoachModel } from './coach-team-member';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { LoggerService } from '../../core/services/logger.service';
import { TeamMember } from '../../core/teamMember/team-member';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  teamMemberControl: FormControl = new FormControl();
  coachControl: FormControl = new FormControl();
  teamMembers: TeamMember[];
  filteredTeamMembers: Observable<TeamMember[]>;
  selectedTeamMember: CoachTeamMember;
  coachedTeamMembers: CoachTeamMember[];
  teamMemberCoach: TeamMemberCoachModel;

  constructor(private tmService: TeamMemberService,
    private logger: LoggerService,
    private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.getTeamMembers();
    this.getCoachedTeamMembers();
  }

  displayName(teamMember: TeamMember) {
    return teamMember ? teamMember.LastFirstName : teamMember;
  }

  mapSelectedTeamMember() {
    const teamMember: TeamMember = this.teamMemberControl.value;
    this.selectedTeamMember = new CoachTeamMember();

    for (let x = 0; x < this.coachedTeamMembers.length; x++) {
      if (teamMember.TeamMemberId === this.coachedTeamMembers[x].TeamMemberId) {
        this.selectedTeamMember = this.coachedTeamMembers[x];
      }
    }

    this.noCoach(teamMember);
  }

  saveNewCoach() {
    if (this.coachControl.value === null) {
      return;
    } else {
      this.tmService.saveTeamMemberCoach(this.teamMemberCoach)
        .subscribe(data => {
          this.openSnackBar('Coach assigned!');
        }, error => {
          this.logger.error(error);
          this.openSnackBar('Error assigning coach!');
        });
    }
  }

  updateCoach() {
    if (this.coachControl.value == null) {
      return;
    } else {
      this.tmService.updateTeamMemberCoach(this.teamMemberCoach)
        .subscribe(data => {
          this.openSnackBar('Coach updated!');
        }, error => {
          this.logger.error(error);
          this.openSnackBar('Error updating coach!');
        });
    }
  }

  private filter(val: string): TeamMember[] {
    return this.teamMembers.filter(teamMember =>
      teamMember.LastFirstName.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  private getTeamMembers() {
    this.tmService.getTeamMembers()
      .subscribe(data => {
        this.teamMembers = data;
        this.setFilteredTeamMembers();
        this.logger.log('team members retrieved!');
      }, error => {
        this.logger.error(error);
      });
  }

  private getCoachedTeamMembers() {
    this.tmService.getCoachesTeamMembers()
      .subscribe(data => {
        this.coachedTeamMembers = data;
        this.logger.log('Retrieved Coach team members list');
      }, error => {
        this.logger.error(error);
      });
  }

  private noCoach(TeamMember: TeamMember) {
    if (this.selectedTeamMember.TeamMemberId === undefined) {
      this.selectedTeamMember.TeamMemberId = TeamMember.TeamMemberId;
      this.selectedTeamMember.TeamMemberFirstName = TeamMember.FirstName;
      this.selectedTeamMember.TeamMemberLastName = TeamMember.LastName;
      this.selectedTeamMember.CoachId = 0;
    }
  }

  private setFilteredTeamMembers() {
    this.filteredTeamMembers = this.teamMemberControl.valueChanges
      .startWith(null)
      .map(teamMember => teamMember && typeof teamMember === 'object' ? teamMember.TeamMemberLastName : teamMember)
      .map(val => val ? this.filter(val) : this.teamMembers.slice());
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
