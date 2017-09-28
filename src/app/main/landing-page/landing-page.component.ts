import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  teamMemberControl: FormControl;

  constructor() { }

  ngOnInit() {
    this.teamMemberControl = new FormControl();
  }

}
