import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { TeamMember } from '../../core/teamMember/team-member';
import { AdminService } from '../services/admin.service';
import { LoggerService } from '../../core/services/logger.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-entry',
  templateUrl: './admin-entry.component.html',
  styleUrls: ['./admin-entry.component.scss']
})
export class AdminEntryComponent implements OnInit {
  teamMemberList: TeamMember[];
  defaultTeamMember$: Observable<TeamMember>;
  emulatedTeamMember: TeamMember;
  selected: string;

  constructor(private adminService: AdminService,
    private logger: LoggerService,
    private tmService: TeamMemberService) { }

  ngOnInit() {
    this.getTeamMembers();
    this.defaultTeamMember$ = this.tmService.defaultTeamMember$;
  }

  getTeamMembers() {
    this.adminService.getTeamMembers()
      .subscribe(data => {
        this.logger.log('List of team member retrieved');
        this.teamMemberList = data;
      }, error => {
        this.logger.error(error);
      });
  }

  mapTeamMember() {
    for (let index = 0; index < this.teamMemberList.length; index++) {
      if (this.selected === this.teamMemberList[index].LastFirstName) {
        this.emulatedTeamMember = this.teamMemberList[index];
      }
    }
  }

  assignEmulatedTeamMember() {
    this.tmService.setEmulatedTeamMember(this.emulatedTeamMember);
  }
}
