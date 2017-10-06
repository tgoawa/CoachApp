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
} from '@angular/material';

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
  ],
  declarations: [
    MainComponent,
    LandingPageComponent
  ]
})
export class MainModule { }
