import { Component, OnInit, Input } from '@angular/core';
import { TeamMember } from '../../core/teamMember/team-member';

@Component({
  selector: 'app-no-coach',
  templateUrl: './no-coach.component.html',
  styleUrls: ['./no-coach.component.scss']
})
export class NoCoachComponent implements OnInit {
  @Input('noCoach') noCoach: TeamMember[];
  constructor() { }

  ngOnInit() {
  }

}
