import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { CoachTeamMember, TeamMemberCoachModel } from './coach-team-member';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  teamMemberControl: FormControl = new FormControl();
  coachControl: FormControl = new FormControl();
  teamMembers: CoachTeamMember[];
  filteredTeamMembers: Observable<CoachTeamMember[]>;
  selectedTeamMember: Observable<CoachTeamMember>;
  teamMemberCoach: TeamMemberCoachModel;

  constructor(private tmService: TeamMemberService,
    private logger: LoggerService,
    private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.getTeamMembers();
    this.selectedTeamMember = this.teamMemberControl.valueChanges;
  }

  displayName(teamMember: CoachTeamMember) {
    return teamMember ? teamMember.TeamMemberLastName + ',' + ' ' + teamMember.TeamMemberFirstName : teamMember;
  }

  getTeamMembers() {
    this.tmService.getCoachesTeamMembers()
      .subscribe(data => {
        this.teamMembers = data;
        this.setFilteredTeamMembers();
        this.logger.log('team members retrieved!');
      }, error => {
        this.logger.error(error);
      });
  }

  mapTeamMemberCoach() {
    const teamMember: CoachTeamMember = this.teamMemberControl.value;
    const coach: CoachTeamMember = this.coachControl.value;
    this.teamMemberCoach = new TeamMemberCoachModel();
    this.teamMemberCoach.CoachId = coach.TeamMemberId;
    this.teamMemberCoach.TeamMemberId = teamMember.TeamMemberId;
  }

  saveNewCoach() {
    if (this.coachControl.value === null) {
      return;
    } else {
      this.mapTeamMemberCoach();
      this.tmService.saveTeamMemberCoach(this.teamMemberCoach)
        .subscribe(data => {
          this.openSnackBar('Coach assigned!');
          this.updateLocalTeamMember();
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
      this.mapTeamMemberCoach();
      this.tmService.updateTeamMemberCoach(this.teamMemberCoach)
        .subscribe(data => {
          this.openSnackBar('Coach updated!');
          this.updateLocalTeamMember();
        }, error => {
          this.logger.error(error);
          this.openSnackBar('Error updating coach!');
        });
    }
  }

  private filter(val: string): CoachTeamMember[] {
    return this.teamMembers.filter(teamMember =>
      teamMember.TeamMemberLastName.toLowerCase().indexOf(val.toLowerCase()) === 0);
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

  private updateLocalTeamMember() {
    const selectedTeamMember: CoachTeamMember = this.teamMemberControl.value;
    const selectedCoach: CoachTeamMember = this.coachControl.value;

    for (let x = 0; x < this.teamMembers.length; x++) {
      if (selectedTeamMember.TeamMemberId === this.teamMembers[x].TeamMemberId) {
        this.teamMembers[x].CoachId = selectedCoach.TeamMemberId;
        this.teamMembers[x].CoachFirstName = selectedCoach.TeamMemberFirstName;
        this.teamMembers[x].CoachLastName = selectedCoach.TeamMemberLastName;
      }
    }
  }

}
