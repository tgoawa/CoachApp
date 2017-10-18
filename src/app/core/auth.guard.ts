import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Cookie } from 'ng2-cookies';
import { LoginService } from '../login/login.service';
import { LoggerService } from './services/logger.service';
import { TeamMemberService } from './teamMember/team-member.service';

@Injectable()
export class AuthGuard implements CanActivate {
  isAuthorizedUser: boolean;
  constructor(private router: Router,
    private lsService: LoginService,
    private tmService: TeamMemberService,
    private logger: LoggerService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const username = Cookie.get('user');
    if (!Cookie.check('user')) {
      this.router.navigate(['login']);
      return Observable.of(false);
    } else if (username === 'sledgej' || username === 'dorrisb') {
      this.tmService.getTeamMember(username);
      return Observable.of(true);
    } else {
      return this.lsService.isCoachAppAuth(username)
        .map(value => {
          if (!value) {
            this.router.navigate(['no-access']);
            return value;
          } else {
            this.tmService.getTeamMember(username);
            return value;
          }
        });
    }
  }
}
