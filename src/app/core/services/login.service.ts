import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { User } from '../login/user';
import { environment } from '../../../environments/environment';

const api = environment.envApi;
@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  checkStatus(user: User) {
    return this.http.post(api + 'UserService/IsUserValid/', user)
    .map(response => response.json(), error => console.log(error));
  }
}
