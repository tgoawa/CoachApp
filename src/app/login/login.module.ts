import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent, SignInComponent]
})
export class LoginModule { }
