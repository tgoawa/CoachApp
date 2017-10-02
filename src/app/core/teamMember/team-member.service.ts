import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { TeamMember } from './team-member';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../services/logger.service';

const api = environment.envApi;
@Injectable()
export class TeamMemberService {
  defaultTeamMember$: Observable<TeamMember>;
  emulatedTeamMember$: Observable<TeamMember>;
  defaultTeamMember: TeamMember;
  private _defaultTeamMember: BehaviorSubject<TeamMember>;
  private _emulatedTeamMember: BehaviorSubject<TeamMember>;

  constructor(private http: Http, private logger: LoggerService) {
    this._defaultTeamMember = <BehaviorSubject<TeamMember>>new BehaviorSubject({});
    this._emulatedTeamMember = <BehaviorSubject<TeamMember>>new BehaviorSubject({});
    this.defaultTeamMember$ = this._defaultTeamMember.asObservable();
    this.emulatedTeamMember$ = this._emulatedTeamMember.asObservable();
  }

  getTeamMember(userName: string) {
    this.http.get(api + 'EmployeeService/GetEmployee/' + userName)
      .map(response => response.json(), error => this.logger.error(error))
      .subscribe(data => {
        this.defaultTeamMember = data;
        this._defaultTeamMember.next(Object.assign({}, this.defaultTeamMember));
        this.setEmulatedTeamMember(this.defaultTeamMember);
      }, error => {
        this.logger.error('Could not get team member');
      });
  }

  getTeamMembers() {
    return this.http.get(api + 'EmployeeService/getActiveTeamMembers/')
      .map(response => response.json(), error => this.logger.error(error));
  }

  getCoachesTeamMembers() {
    return this.http.get(api + 'EmployeeService/GetCoachsTeamMembers')
    .map(response => response.json(), error => this.logger.error(error));
  }

  saveTeamMemberCoach(obj) {
    return this.http.post(api + 'EmployeeService/saveTeamMemberCoach/', obj)
    .map(response => response.json(), error => this.logger.error('Could not assign coach'));
  }

  updateTeamMemberCoach(obj) {
    return this.http.put(api + 'EmployeeService/updateTeamMemberCoach/', obj)
    .map(response => response.json(), error => this.logger.error('Could not update coach'));
  }

  setEmulatedTeamMember(teamMember: TeamMember) {
    this._emulatedTeamMember.next(Object.assign({}, teamMember));
  }

  resetEmulatedTeamMember() {
    this.setEmulatedTeamMember(this.defaultTeamMember);
  }

}
