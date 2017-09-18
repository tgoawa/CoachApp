import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MainRoutingModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
