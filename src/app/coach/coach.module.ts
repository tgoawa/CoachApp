import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { TypeaheadModule } from 'ngx-bootstrap';

import { CoachRoutingModule } from './coach-routing.module';
import { ManageComponent } from './manage/manage.component';
import { CoachComponent } from './coach.component';

@NgModule({
  imports: [
    CommonModule,
    CoachRoutingModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [ManageComponent, CoachComponent]
})
export class CoachModule { }
