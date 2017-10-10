import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { User } from '../login/user';
import { environment } from '../../environments/environment';
import { LoggerService } from '../core/services/logger.service';
import { Router } from '@angular/router';
import { TeamMemberService } from '../core/teamMember/team-member.service';

const api = environment.envApi;
@Injectable()
export class LoginService {
  constructor(private http: Http,
    private logger: LoggerService,
    private router: Router,
    private tmService: TeamMemberService) { }

  checkStatus(user: User) {
    return this.http.post(api + 'UserService/IsUserValid/', user)
      .map(response => response.json(), error => console.log(error));
  }

  isCoachAppAuth(username: string) {
    return this.http.get(api + 'UserService/IsCoachAppAuthorized/' + username)
      .take(1)
      .map(response => response.json(), error => console.log('error verifying access!'));
  }

}
