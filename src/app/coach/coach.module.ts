import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { CoachRoutingModule } from './coach-routing.module';
import { ManageComponent } from './manage/manage.component';
import { CoachComponent } from './coach.component';

import { MatCardModule, MatAutocompleteModule, MatInputModule, MatTableModule, MatButtonModule } from '@angular/material';
import { AssociatedTableComponent } from './associated-table/associated-table.component';

@NgModule({
  imports: [
    CommonModule,
    CoachRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule
  ],
  declarations: [ManageComponent, CoachComponent, AssociatedTableComponent]
})
export class CoachModule { }
