import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { CoachTeamMember } from './coach-team-member';
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

  constructor(private tmService: TeamMemberService, private logger: LoggerService) { }

  ngOnInit() {
    this.getTeamMembers();
    this.selectedTeamMember = this.teamMemberControl.valueChanges;
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

  displayName(teamMember: CoachTeamMember) {
    return teamMember ? teamMember.TeamMemberLastName + ',' + ' ' + teamMember.TeamMemberFirstName : teamMember;
  }

  private setFilteredTeamMembers() {
    this.filteredTeamMembers = this.teamMemberControl.valueChanges
      .startWith(null)
      .map(teamMember => teamMember && typeof teamMember === 'object' ? teamMember.TeamMemberLastName : teamMember)
      .map(val => val ? this.filter(val) : this.teamMembers.slice());
  }

  private filter(val: string): CoachTeamMember[] {
    return this.teamMembers.filter(teamMember =>
      teamMember.TeamMemberLastName.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}
