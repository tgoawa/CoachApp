import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatListModule
} from '@angular/material';

import { NoCoachRoutingModule } from './no-coach-routing.module';
import { NoCoachComponent } from './no-coach.component';
import { NoCoachListComponent } from './no-coach-list/no-coach-list.component';
import { NoCoachLandingComponent } from './no-coach-landing/no-coach-landing.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    NoCoachRoutingModule
  ],
  declarations: [NoCoachComponent, NoCoachLandingComponent, NoCoachListComponent]
})
export class NoCoachModule { }
