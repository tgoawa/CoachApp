import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedTableComponent } from './associated-table.component';

describe('AssociatedTableComponent', () => {
  let component: AssociatedTableComponent;
  let fixture: ComponentFixture<AssociatedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociatedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
