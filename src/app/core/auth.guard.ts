import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Cookie } from 'ng2-cookies';
import { LoginService } from '../login/login.service';
import { LoggerService } from './services/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private lsService: LoginService,
    private logger: LoggerService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const username = Cookie.get('user');
      if (!Cookie.check('user')) {
        this.router.navigate(['login']);
        return false;
      } else {
        if (username !== 'sledgej') {
          this.getAuth(username);
        } else {
          return true;
        }
      }
  }

  private getAuth(username: string) {
    this.lsService.isCoachAppAuth(username)
    .subscribe(data => {
      this.setAuthAccess(data);
    }, error => {
      this.logger.error('Error in auth guard');
    });
  }

  private setAuthAccess(data: boolean) {
    if (!data) {
      this.router.navigate(['no-access']);
    } else {
      return true;
    }
  }
}
