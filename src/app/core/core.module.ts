import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CollapseModule } from 'ngx-bootstrap';

import { throwIfAlreadyLoaded } from './module-import.guard';
import { HeaderComponent } from './header/header.component';


@NgModule({
  imports: [
    CommonModule,
    CollapseModule,
    RouterModule
  ],
  declarations: [HeaderComponent]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
