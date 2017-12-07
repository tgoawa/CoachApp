import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCoachLandingComponent } from './no-coach-landing.component';

describe('NoCoachLandingComponent', () => {
  let component: NoCoachLandingComponent;
  let fixture: ComponentFixture<NoCoachLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoCoachLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCoachLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
