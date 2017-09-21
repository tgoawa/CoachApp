import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachRoutingModule } from './coach-routing.module';
import { ManageComponent } from './manage/manage.component';
import { CoachComponent } from './coach.component';

@NgModule({
  imports: [
    CommonModule,
    CoachRoutingModule
  ],
  declarations: [ManageComponent, CoachComponent]
})
export class CoachModule { }
