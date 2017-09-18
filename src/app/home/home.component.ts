import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../core/teamMember/team-member.service';
import { TeamMember } from '../core/teamMember/team-member';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  teamMember: TeamMember;

  constructor() { }

  ngOnInit() { }

}
