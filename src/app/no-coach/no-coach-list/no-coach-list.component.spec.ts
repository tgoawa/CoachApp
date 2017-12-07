import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCoachComponent } from './no-coach.component';

describe('NoCoachComponent', () => {
  let component: NoCoachComponent;
  let fixture: ComponentFixture<NoCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
