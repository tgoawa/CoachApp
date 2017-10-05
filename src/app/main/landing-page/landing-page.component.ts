import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { TeamMemberCoachModel } from '../../core/models/coach-team-member';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { LoggerService } from '../../core/services/logger.service';
import { TeamMember } from '../../core/teamMember/team-member';
import { ActivatedRoute } from '@angular/router';

enum Status {
  success = 1,
  error = 2,
  default = 0
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  @ViewChild('auto') auto: ElementRef;
  @ViewChild('coach') coach: ElementRef;
  teamMemberControl: FormControl = new FormControl();
  coachControl: FormControl = new FormControl();
  teamMembers: TeamMember[];
  filteredTeamMembers: Observable<TeamMember[]>;
  filteredCoaches: Observable<TeamMember[]>;
  selectedTeamMember: TeamMember;
  selectedTeamMemberCoach: TeamMember;
  teamMemberCoach: TeamMemberCoachModel;
  messageStatus: Status;

  constructor(private tmService: TeamMemberService,
    private logger: LoggerService,
    private snackBar: MdSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTeamMembers();
  }

  displayName(teamMember: TeamMember) {
    return teamMember ? teamMember.LastFirstName : teamMember;
  }

  onTeamMemberSelected() {
    this.resetMessages();
    const teamMember: TeamMember = this.teamMemberControl.value;
    this.setSelectedTeamMember(teamMember.TeamMemberId);
  }

  onMapCoachToTeamMember() {
    const coach: TeamMember = this.coachControl.value;
    this.teamMemberCoach = new TeamMemberCoachModel();
    this.teamMemberCoach.CoachId = coach.TeamMemberId;
    this.teamMemberCoach.TeamMemberId = this.selectedTeamMember.TeamMemberId;

  }

  updateCoach() {
    if (this.coachControl.value === null) {
      return;
    } else {
      this.tmService.updateTeamMemberCoach(this.teamMemberCoach)
        .subscribe(data => {
          this.openSnackBar('Coach updated!');
          this.messageStatus = 1;
          this.updateCoachName();
        }, error => {
          this.logger.error(error);
          this.messageStatus = 2;
          this.openSnackBar('Error updating coach!');
        });
    }
  }

  private routeHasParam() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.setSelectedTeamMember(params['id']);
      }
    });
  }

  private filter(val: string): TeamMember[] {
    return this.teamMembers.filter(teamMember =>
      teamMember.LastFirstName.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  private getTeamMembers() {
    this.tmService.getTeamMembers()
      .subscribe(data => {
        this.teamMembers = data;
        this.setFilteredTeamMembers(this.teamMembers);
        this.setFilteredCoaches(this.teamMembers);
        this.routeHasParam();
        this.logger.log('team members retrieved!');
      }, error => {
        this.logger.error(error);
      });
  }

  private resetMessages() {
    this.messageStatus = 0;
  }

  private setFilteredTeamMembers(teamMembers: TeamMember[]) {
    this.filteredTeamMembers = this.teamMemberControl.valueChanges
      .startWith(null)
      .map(teamMember => teamMember && typeof teamMember === 'object' ? teamMember.LastName : teamMember)
      .map(val => val ? this.filter(val) : teamMembers.slice());
  }

  private setFilteredCoaches(teamMembers: TeamMember[]) {
    this.filteredCoaches = this.coachControl.valueChanges
      .startWith(null)
      .map(coach => coach && typeof coach === 'object' ? coach.LastName : coach)
      .map(val => val ? this.filter(val) : teamMembers.slice());
  }

  private setCoach(coachId: number) {
    this.selectedTeamMemberCoach = new TeamMember();
    if (coachId === 0) {
      this.selectedTeamMemberCoach.FirstName = '';
      this.selectedTeamMemberCoach.LastName = '';
    } else {
      for (let x = 0; x < this.teamMembers.length; x++) {
        if (coachId === this.teamMembers[x].TeamMemberId) {
          this.selectedTeamMemberCoach = this.teamMembers[x];
        }
      }
    }
  }

  private setSelectedTeamMember(id: number) {
    for (let x = 0; x < this.teamMembers.length; x++) {
      if (+id === this.teamMembers[x].TeamMemberId) {
        this.selectedTeamMember = this.teamMembers[x];
      }
    }
    this.setCoach(this.selectedTeamMember.CoachId);
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  private updateCoachName() {
    const coach: TeamMember = this.coachControl.value;
    this.selectedTeamMemberCoach = coach;
  }

}
