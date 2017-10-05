import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Cookie } from 'ng2-cookies';
import * as CryptoJS from 'crypto-js';
import { User } from './user';
import { LoggerService } from '../core/services/logger.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private lgService: LoginService,
    private logger: LoggerService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.toFormGroup();
  }

  onSubmit(formValue: User) {
    const encUser = this.encryptUser();
    this.checkUser(encUser);
  }

  private authAccess() {
    const user: string = this.loginForm.get('username').value;
    this.lgService.isCoachAppAuth(user)
    .subscribe(data => {
      this.setAppAccess(data);
    }, error => {
      this.logger.error(error);
    });
  }

  private checkUser(user: User) {
    this.lgService.checkStatus(user)
      .subscribe(data => {
        this.logger.log('Login Successful!');
        this.setAuthStatus(data);
      }, error => {
        this.logger.error(error);
      });
  }

  private encryptUser() {
    const key = CryptoJS.enc.Utf8.parse('8080808080808080');
    const iv = CryptoJS.enc.Utf8.parse('8080808080808080');
    const encryptedUser: User = {
      username: null,
      password: null
    };

    encryptedUser.username = CryptoJS.AES.encrypt(this.loginForm.get('username').value, key, { iv: iv }).toString();
    encryptedUser.password = CryptoJS.AES.encrypt(this.loginForm.get('password').value, key, { iv: iv }).toString();
    return encryptedUser;
  }

  private setAppAccess(data: boolean) {
    if (data) {
      Cookie.set('user', this.loginForm.get('username').value, 45);
      this.router.navigate(['/home']);
    } else {
      this.logger.log('User does not have access');
      this.router.navigate(['/no-access']);
    }
  }

  private setAuthStatus(data: boolean) {
    if (data) {
      this.authAccess();
    } else {
      this.logger.error('Login Failed!');
    }
  }

  private toFormGroup() {
    const formGroup = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });

    return formGroup;
  }
}
