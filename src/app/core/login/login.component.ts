import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Cookie } from 'ng2-cookies';
import * as CryptoJS from 'crypto-js';
import { LoginService } from '../services/login.service';
import { LoggerService } from '../services/logger.service';
import { User } from './user';

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
      username: '',
      password: ''
    };

    encryptedUser.username = CryptoJS.AES.encrypt(this.loginForm.get('username').value, key, { iv: iv }).toString();
    encryptedUser.password = CryptoJS.AES.encrypt(this.loginForm.get('password').value, key, { iv: iv }).toString();
    return encryptedUser;
  }

  private setAuthStatus(data: boolean) {
    if (data) {
      Cookie.set('user', this.loginForm.get('username').value, 45);
      this.router.navigate(['/home']);
    } else {
      this.logger.error('Login Failed!');
      console.log('Error logging in');
    }
  }

  private toFormGroup() {
    const formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    return formGroup;
  }

}
