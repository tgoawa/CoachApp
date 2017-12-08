import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { MatSort, MatPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TeamMember } from '../../core/teamMember/team-member';

export class CoachList extends DataSource<TeamMember> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filterData: TeamMember[] = [];
  renderedData: TeamMember[] = [];
  constructor(private data: TeamMember[], private _sort: MatSort, private _paginator: MatPaginator) {
    super();

    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }
  connect(): Observable<TeamMember[]> {
    const displayDataChanges = [
      this.data,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      this.filterData = this.data.slice().filter((item: TeamMember) => {
        const searchStr = (item.LastFirstName +
          item.Location +
          item.BusinessUnit)
        .toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      const sortedData = this.getSortedData(this.filterData.slice());

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  disconnect() {}

  getSortedData(data: TeamMember[]): TeamMember[] {
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'lastFirstName': [propertyA, propertyB] = [a.LastName, b.LastName]; break;
        case 'location': [propertyA, propertyB] = [a.Location, b.Location]; break;
        case 'businessUnit': [propertyA, propertyB] = [a.BusinessUnit, b.BusinessUnit]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
