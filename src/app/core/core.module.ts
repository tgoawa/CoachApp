import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MdToolbarModule, MdButtonModule, MdIconModule } from '@angular/material';

import { throwIfAlreadyLoaded } from './module-import.guard';
import { HeaderComponent } from './header/header.component';
import { LoggerService } from './services/logger.service';
import { AuthGuard } from './auth.guard';
import { TeamMemberService } from './teamMember/team-member.service';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule
  ],
  exports: [
    HeaderComponent,
  ],
  declarations: [HeaderComponent],
  providers: [ LoggerService, AuthGuard, TeamMemberService]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
