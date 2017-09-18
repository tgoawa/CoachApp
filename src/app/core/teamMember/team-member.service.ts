import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { TeamMember } from './team-member';
import { environment } from '../../../environments/environment';

const api = environment.envApi;
@Injectable()
export class TeamMemberService {
  defaultTeamMember: TeamMember;
  emulatedTeamMember: Observable<TeamMember>;
  private _emulatedTeamMember: BehaviorSubject<TeamMember>;
  constructor(private http: Http) {
    this._emulatedTeamMember = <BehaviorSubject<TeamMember>>new BehaviorSubject({});
    this.emulatedTeamMember = this._emulatedTeamMember.asObservable();
  }

  getTeamMember(userName: string) {
    return this.http.get(api + 'EmployeeService/GetEmployee/' + userName)
      .map(response => response.json(), error => console.log(error));
  }

  setEmulatedTeamMember(teamMember: TeamMember) {
    this._emulatedTeamMember.next(Object.assign({}, teamMember));
  }

}
