import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { TeamMember } from '../../core/teamMember/team-member';
import { CoachList } from './coachList';

@Component({
  selector: 'app-no-coach-list',
  templateUrl: './no-coach-list.component.html',
  styleUrls: ['./no-coach-list.component.scss']
})
export class NoCoachListComponent implements OnInit {
  @Input('noCoachList') noCoachList: TeamMember[];
  displayedColumns = ['lastFirstName', 'location', 'businessUnit'];
  selection = new SelectionModel<string>(true, []);
  dataSource: CoachList;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  constructor(private router: Router) { }

  ngOnInit() {
    this.setTable();
  }

  onAssignCoach(id: number) {
    this.router.navigate(['home', {id}]);
  }

  private setTable() {
    this.dataSource = new CoachList(this.noCoachList, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}
