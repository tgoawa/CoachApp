import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CollapseModule } from 'ngx-bootstrap';

import { throwIfAlreadyLoaded } from './module-import.guard';
import { HeaderComponent } from './header/header.component';
import { LoggerService } from './services/logger.service';
import { AuthGuard } from './auth.guard';
import { TeamMemberService } from './teamMember/team-member.service';
import { TeamMemberResolver } from './teamMember/team-member.resolver';


@NgModule({
  imports: [
    CommonModule,
    CollapseModule,
    HttpModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
  ],
  declarations: [HeaderComponent],
  providers: [ LoggerService, AuthGuard, TeamMemberService, TeamMemberResolver ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
