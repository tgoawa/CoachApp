import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { CollapseModule } from 'ngx-bootstrap';
import { TeamMemberService } from '../teamMember/team-member.service';
import { HttpModule } from '@angular/http';
import { LoggerService } from '../services/logger.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CollapseModule, HttpModule, RouterTestingModule ],
      declarations: [ HeaderComponent ],
      providers: [ LoggerService, TeamMemberService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
