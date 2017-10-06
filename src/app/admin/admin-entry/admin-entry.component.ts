import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { TeamMember } from '../../core/teamMember/team-member';
import { LoggerService } from '../../core/services/logger.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-entry',
  templateUrl: './admin-entry.component.html',
  styleUrls: ['./admin-entry.component.scss']
})
export class AdminEntryComponent implements OnInit, OnDestroy {
  @ViewChild('auto') auto: ElementRef;
  teamMemberControl: FormControl = new FormControl();
  teamMemberList: TeamMember[];
  filteredTeamMembers: Observable<TeamMember[]>;
  defaultTeamMember$: Observable<TeamMember>;
  selectedTeamMember: Observable<TeamMember>;

  private Subscription: Subscription;

  constructor(private logger: LoggerService,
    private tmService: TeamMemberService,
    private lsService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.getTeamMembers();
    this.defaultTeamMember$ = this.tmService.defaultTeamMember$;
    this.selectedTeamMember = this.teamMemberControl.valueChanges;
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

  getTeamMembers() {
   this.Subscription = this.tmService.getTeamMembers()
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
    this.isCoachAppAuth(selectedTeamMember.UserName);
  }

  private isCoachAppAuth(username: string) {
   const subscription =  this.lsService.isCoachAppAuth(username)
      .subscribe(data => {
        this.setAppAccess(data);
      }, error => {
        this.logger.error(error);
      });
    this.Subscription.add(subscription);
  }

  private setAppAccess(data: boolean) {
    if (!data) {
      this.router.navigate(['admin/admin-no-access']);
      this.tmService.toggleAccess(false);
    }
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
