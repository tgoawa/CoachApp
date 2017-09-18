import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TeamMember } from './team-member';
import { TeamMemberService } from './team-member.service';

import { Cookie } from 'ng2-cookies';

@Injectable()
export class TeamMemberResolver {
  constructor(private tsService: TeamMemberService) { }

  resolve() {
    const userName = Cookie.get('user');
    return this.tsService.getTeamMember(userName);
  }
}
