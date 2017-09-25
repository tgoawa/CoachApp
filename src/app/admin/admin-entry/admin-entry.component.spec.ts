import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEntryComponent } from './admin-entry.component';
import { TypeaheadModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoggerService } from '../../core/services/logger.service';
import { TeamMemberService } from '../../core/teamMember/team-member.service';

describe('AdminEntryComponent', () => {
  let component: AdminEntryComponent;
  let fixture: ComponentFixture<AdminEntryComponent>;

  beforeEach(async(() => {
    // team Member object
    const adminServiceStub = [{
      TeamMemberId: 1936,
      UserName: 'sledgeJ',
      FirstName: 'Jonathan',
      LastName: 'Sledge',
      LastFirstName: 'Sledge,Jonathan',
      IsAccountDirector: false,
      IsManager: false,
      IndustryTeams: null,
      IsShareHolder: false,
      IsChargable: false,
      IsCoach: false,
      IsShareHolderCoach: false,
      IsGreenBay: false,
      IsShareholderGoalEdit: false,
      IndustryTeam1: null,
      IndustryTeam2: null,
      IndustryTeam3: null,
      IndustryTeam4: null,
      StaffTypeId: 17
    }];

    TestBed.configureTestingModule({
      imports: [TypeaheadModule.forRoot(), FormsModule,  HttpModule],
      declarations: [ AdminEntryComponent ],
      providers: [ LoggerService, TeamMemberService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // AdminService actually injected into the component
    const teamMemberService = fixture.debugElement.injector.get(TeamMemberService);

    // Setup spy on `getTeamMembers` function
    const spy = spyOn(teamMemberService, 'getTeamMembers')
      .and.returnValue(Promise.resolve(this.adminServiceStub));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
