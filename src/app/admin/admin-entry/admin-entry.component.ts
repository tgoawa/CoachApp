import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { TeamMember } from '../../core/teamMember/team-member';
import { LoggerService } from '../../core/services/logger.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-admin-entry',
  templateUrl: './admin-entry.component.html',
  styleUrls: ['./admin-entry.component.scss']
})
export class AdminEntryComponent implements OnInit {
  teamMemberControl: FormControl = new FormControl();
  teamMemberList: TeamMember[];
  filteredTeamMembers: Observable<TeamMember[]>;
  defaultTeamMember$: Observable<TeamMember>;
  selectedTeamMember: Observable<TeamMember>;

  constructor(private logger: LoggerService,
    private tmService: TeamMemberService) { }

  ngOnInit() {
    this.getTeamMembers();
    this.defaultTeamMember$ = this.tmService.defaultTeamMember$;
    this.selectedTeamMember = this.teamMemberControl.valueChanges;
  }

  getTeamMembers() {
    this.tmService.getTeamMembers()
      .subscribe(data => {
        this.logger.log('List of team members retrieved');
        this.teamMemberList = data;
        this.setFilteredTeamMembers();
      }, error => {
        this.logger.error(error);
      });
  }

  displayName(teamMember: TeamMember) {
    return teamMember ? teamMember.LastFirstName : teamMember;
  }

  assignEmulatedTeamMember() {
    const selectedTeamMember = this.teamMemberControl.value;
    this.tmService.setEmulatedTeamMember(selectedTeamMember);
  }

  private setFilteredTeamMembers() {
    this.filteredTeamMembers = this.teamMemberControl.valueChanges
    .startWith(null)
    .map(teamMember => teamMember && typeof teamMember === 'object' ? teamMember.LastFirstName : teamMember)
    .map(val => val ? this.filter(val) : this.teamMemberList.slice());
  }

  private filter(val: string): TeamMember[] {
    return this.teamMemberList.filter(teamMember =>
    teamMember.LastFirstName.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
}
