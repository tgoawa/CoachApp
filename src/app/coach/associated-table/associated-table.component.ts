import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CoachTeamMember } from '../../core/models/coach-team-member';

@Component({
  selector: 'app-associated-table',
  templateUrl: './associated-table.component.html',
  styleUrls: ['./associated-table.component.scss']
})
export class AssociatedTableComponent implements OnInit, OnChanges {
  @Input() data: CoachTeamMember[];
  displayedColumns = ['firstname', 'lastname'];
  dataSource: AssociatedDataSource;
  constructor() { }

  ngOnInit() {
    this.dataSource = new AssociatedDataSource(this.data);
  }

  ngOnChanges() {
    this.dataSource = new AssociatedDataSource(this.data);
  }

}

export class AssociatedDataSource extends DataSource<CoachTeamMember> {

  constructor(private data: CoachTeamMember[]) {
    super();
  }
  connect(): Observable<CoachTeamMember[]> {
    return Observable.of(this.data);
  }

  disconnect() {}
}
