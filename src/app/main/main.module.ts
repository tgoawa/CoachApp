import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import {
  MatCardModule,
  MatAutocompleteModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { AssignCoachComponent } from './assign-coach/assign-coach.component';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MatCardModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    MainComponent,
    LandingPageComponent,
    AssignCoachComponent
  ]
})
export class MainModule { }
