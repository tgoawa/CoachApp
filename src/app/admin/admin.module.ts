import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TypeaheadModule } from 'ngx-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminEntryComponent } from './admin-entry/admin-entry.component';
import { AdminComponent } from './admin.component';
import { AdminService } from './services/admin.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    AdminRoutingModule
  ],
  declarations: [AdminEntryComponent, AdminComponent],
  providers: [ AdminService ]
})
export class AdminModule { }
