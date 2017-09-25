import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TypeaheadModule } from 'ngx-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminEntryComponent } from './admin-entry/admin-entry.component';
import { AdminComponent } from './admin.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    AdminRoutingModule
  ],
  declarations: [AdminEntryComponent, AdminComponent]
})
export class AdminModule { }
