import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TeamMember } from '../core/teamMember/team-member';
import { TeamMemberService } from '../core/teamMember/team-member.service';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userName: string;
  defaultTeamMember$: Observable<TeamMember>;

  constructor(private tmService: TeamMemberService) { }

  ngOnInit() {
    this.defaultTeamMember$ = this.tmService.defaultTeamMember$;
    // this.userName = Cookie.get('user');
    // this.tmService.getTeamMember(this.userName);
  }

}
