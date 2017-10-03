import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { CoachTeamMember, TeamMemberCoachModel } from '../../core/models/coach-team-member';
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
  teamMemberControl: FormControl = new FormControl();
  coachControl: FormControl = new FormControl();
  teamMembers: TeamMember[];
  filteredTeamMembers: Observable<TeamMember[]>;
  selectedTeamMember: CoachTeamMember;
  coachedTeamMembers: CoachTeamMember[];
  teamMemberCoach: TeamMemberCoachModel;
  messageStatus: Status;

  constructor(private tmService: TeamMemberService,
    private logger: LoggerService,
    private snackBar: MdSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTeamMembers();
    this.getCoachedTeamMembers();
    // following is for managing optional team member id
    // this.route.params.subscribe( params => {
    //   console.log(params);
    //   if (params['id']) {
    //     this.setSelectedTeamMember(params['id']);
    //   }
    // });
  }

  displayName(teamMember: TeamMember) {
    return teamMember ? teamMember.LastFirstName : teamMember;
  }

  onTeamMemberSelected() {
    this.resetMessages();
    const teamMember: TeamMember = this.teamMemberControl.value;
    this.selectedTeamMember = new CoachTeamMember();

    for (let x = 0; x < this.coachedTeamMembers.length; x++) {
      if (teamMember.TeamMemberId === this.coachedTeamMembers[x].TeamMemberId) {
        this.selectedTeamMember = this.coachedTeamMembers[x];
      }
    }

    this.noCoach(teamMember);
  }

  onMapCoachToTeamMember() {
    const coach: TeamMember = this.coachControl.value;
    this.teamMemberCoach = new TeamMemberCoachModel();
    this.teamMemberCoach.CoachId = coach.TeamMemberId;
    this.teamMemberCoach.TeamMemberId = this.selectedTeamMember.TeamMemberId;

  }

  saveNewCoach() {
    if (this.coachControl.value === null) {
      return;
    } else {
      this.tmService.saveTeamMemberCoach(this.teamMemberCoach)
        .subscribe(data => {
          this.openSnackBar('Coach assigned!');
          this.messageStatus = 1;
          this.updateCoachName();
        }, error => {
          this.logger.error(error);
          this.messageStatus = 2;
          this.openSnackBar('Error assigning coach!');
        });
    }
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

  private resetMessages() {
    this.messageStatus = 0;
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

  private updateCoachName() {
    const coach: TeamMember = this.coachControl.value;
    this.selectedTeamMember.CoachId = coach.TeamMemberId;
    this.selectedTeamMember.CoachFirstName = coach.FirstName;
    this.selectedTeamMember.CoachLastName = coach.LastName;
  }

}
