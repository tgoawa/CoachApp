import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminEntryComponent } from './admin-entry/admin-entry.component';
import { AdminComponent } from './admin.component';

import { MdCardModule, MatAutocompleteModule, MdInputModule, MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MdCardModule,
    MatAutocompleteModule,
    MdInputModule,
    MdButtonModule
  ],
  declarations: [AdminEntryComponent, AdminComponent]
})
export class AdminModule { }
