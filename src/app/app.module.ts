import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdInputModule, MdButtonModule, MdCardModule } from '@angular/material';


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
    BrowserAnimationsModule,
    HttpModule,
    MainModule,
    ReactiveFormsModule,
    MdInputModule,
    MdButtonModule,
    MdCardModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
