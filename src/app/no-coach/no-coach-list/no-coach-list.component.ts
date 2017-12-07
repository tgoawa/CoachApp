import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TeamMember } from '../../core/teamMember/team-member';

@Component({
  selector: 'app-no-coach-list',
  templateUrl: './no-coach-list.component.html',
  styleUrls: ['./no-coach-list.component.scss']
})
export class NoCoachListComponent implements OnInit {
  @Input('teamMembers') teamMembers: TeamMember[];
  noCoachList: TeamMember[];
  constructor(private router: Router) { }

  ngOnInit() {
    this.noCoachList = this.noCoach(this.teamMembers);
  }

  onAssignCoach(id: number) {
    this.router.navigate(['home', {id}]);
  }

  private noCoach(teamMemberList: TeamMember[]) {
    const list = [];
    for (let x = 0; x < teamMemberList.length; x++) {
      if (teamMemberList[x].CoachFirstName === null) {
        list.push(teamMemberList[x]);
      }
    }
    return list;
  }

}
