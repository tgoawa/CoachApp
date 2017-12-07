import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCoachComponent } from './assign-coach.component';

describe('AssignCoachComponent', () => {
  let component: AssignCoachComponent;
  let fixture: ComponentFixture<AssignCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
