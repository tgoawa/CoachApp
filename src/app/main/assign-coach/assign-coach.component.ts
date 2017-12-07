import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TeamMember } from '../../core/teamMember/team-member';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TeamMemberCoachModel } from '../../core/models/coach-team-member';
import { LoggerService } from '../../core/services/logger.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TeamMemberService } from '../../core/teamMember/team-member.service';

enum Status {
  success = 1,
  error = 2,
  default = 0
}

@Component({
  selector: 'app-assign-coach',
  templateUrl: './assign-coach.component.html',
  styleUrls: ['./assign-coach.component.scss']
})
export class AssignCoachComponent implements OnInit {
  @Input('teamMembers') teamMembers: TeamMember[];
  @ViewChild('auto') auto: ElementRef;
  @ViewChild('coach') coach: ElementRef;
  teamMemberControl: FormControl = new FormControl();
  coachControl: FormControl = new FormControl();
  filteredTeamMembers: Observable<TeamMember[]>;
  filteredCoaches: Observable<TeamMember[]>;
  selectedTeamMember: TeamMember;
  selectedTeamMemberCoach: TeamMember;
  teamMemberCoach: TeamMemberCoachModel;
  messageStatus: Status;

  constructor(private tmService: TeamMemberService,
    private logger: LoggerService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.filteredTeamMembers = this.setFilteredTeamMembers(this.teamMembers, this.teamMemberControl);
    this.filteredCoaches = this.setFilteredTeamMembers(this.teamMembers, this.coachControl);
    this.routeHasParam();
  }

  displayName(teamMember: TeamMember) {
    return teamMember ? teamMember.LastFirstName : teamMember;
  }

  onTeamMemberSelected() {
    this.resetMessages();
    const teamMember: TeamMember = this.teamMemberControl.value;
    this.selectedTeamMember = this.getSelectedTeamMember(teamMember.TeamMemberId);
    this.setCoach(this.selectedTeamMember.CoachId);
  }

  onMapCoachToTeamMember() {
    const coach: TeamMember = this.coachControl.value;
    this.teamMemberCoach = new TeamMemberCoachModel();
    this.teamMemberCoach.CoachId = coach.TeamMemberId;
    this.teamMemberCoach.TeamMemberId = this.selectedTeamMember.TeamMemberId;

  }

  updateCoach() {
    if (this.coachControl.value === null) {
      this.openSnackBar('Please select a coach');
      return;
    } else {
      const subscription = this.tmService.updateTeamMemberCoach(this.teamMemberCoach)
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
    const subscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.selectedTeamMember = this.getSelectedTeamMember(params['id']);
        this.setCoach(this.selectedTeamMember.CoachId);
      }
    });
  }

  private filter(val: string): TeamMember[] {
    return this.teamMembers.filter(teamMember =>
      teamMember.LastFirstName.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  private resetMessages() {
    this.messageStatus = 0;
  }

  private setFilteredTeamMembers(data: TeamMember[], formControl: FormControl) {
    const filteredData = formControl.valueChanges
      .startWith(null)
      .map(teamMember => teamMember && typeof teamMember === 'object' ? teamMember.LastName : teamMember)
      .map(val => val ? this.filter(val) : data.slice());
    return filteredData;
  }

  private setCoach(coachId: number) {
    this.selectedTeamMemberCoach = new TeamMember();
    if (coachId === 0) {
      this.selectedTeamMemberCoach.FirstName = '';
      this.selectedTeamMemberCoach.LastName = '';
    } else {
      this.selectedTeamMemberCoach = this.getSelectedTeamMember(coachId);
    }
  }

  private getSelectedTeamMember(id: number) {
    for (let x = 0; x < this.teamMembers.length; x++) {
      if (+id === this.teamMembers[x].TeamMemberId) {
        return this.teamMembers[x];
      }
    }
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
