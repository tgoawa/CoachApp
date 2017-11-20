import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';
import { TeamMember } from '../../core/teamMember/team-member';

export class AssociatedDataSource extends DataSource<TeamMember> {

  constructor(private data: TeamMember[]) {
      super();
  }
  connect(): Observable<TeamMember[]> {
      return Observable.of(this.data);
  }

  disconnect() { }
}

@Component({
  selector: 'app-associated-table',
  templateUrl: './associated-table.component.html',
  styleUrls: ['./associated-table.component.scss']
})
export class AssociatedTableComponent implements OnInit, OnChanges {
  @Input() data: TeamMember[];
  displayedColumns = ['name'];
  dataSource: AssociatedDataSource;
  constructor(private router: Router) { }

  ngOnInit() {
    this.dataSource = new AssociatedDataSource(this.data);
  }

  ngOnChanges() {
    this.dataSource = new AssociatedDataSource(this.data);
  }

  onAssignCoach(id: number) {
    this.router.navigate(['home', {id}]);
  }

}
