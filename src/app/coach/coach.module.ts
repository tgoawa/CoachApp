import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { CoachRoutingModule } from './coach-routing.module';
import { ManageComponent } from './manage/manage.component';
import { CoachComponent } from './coach.component';

import { MdCardModule, MatAutocompleteModule, MdInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CoachRoutingModule,
    ReactiveFormsModule,
    MdCardModule,
    MatAutocompleteModule,
    MdInputModule
  ],
  declarations: [ManageComponent, CoachComponent]
})
export class CoachModule { }
