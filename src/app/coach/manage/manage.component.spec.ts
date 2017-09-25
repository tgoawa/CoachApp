import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageComponent } from './manage.component';
import { TypeaheadModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { TeamMemberService } from '../../core/teamMember/team-member.service';
import { HttpModule } from '@angular/http';
import { LoggerService } from '../../core/services/logger.service';

describe('ManageComponent', () => {
  let component: ManageComponent;
  let fixture: ComponentFixture<ManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, TypeaheadModule.forRoot() ],
      declarations: [ ManageComponent ],
      providers: [ LoggerService, TeamMemberService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
