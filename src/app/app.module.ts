import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { MainModule } from './main/main.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    MainModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
