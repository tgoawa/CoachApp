import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { TeamMemberCoachModel } from '../../core/models/coach-team-member';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { LoggerService } from '../../core/services/logger.service';
import { TeamMember } from '../../core/teamMember/team-member';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  teamMembers: TeamMember[];
  noCoachList: TeamMember[];

  constructor(
    private tmService: TeamMemberService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.getTeamMembers();
  }

  private getTeamMembers() {
    this.tmService.getTeamMembers().subscribe(
      data => {
        this.teamMembers = data;
        this.noCoachList = this.noCoach(this.teamMembers);
        this.logger.log('team members retrieved!');
      },
      error => {
        this.logger.error(error);
      }
    );
  }

  private noCoach(teamMemberList: TeamMember[]) {
    const list = [];
    for (let x = 0; x < teamMemberList.length; x++) {
      if (teamMemberList[x].CoachFirstName === null) {
        list.push(teamMemberList[x]);
      }
    }
    return list;
  }
}
