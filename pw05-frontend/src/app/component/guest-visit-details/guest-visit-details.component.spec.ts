import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestVisitDetailsComponent } from './guest-visit-details.component';

describe('GuestVisitDetailsComponent', () => {
  let component: GuestVisitDetailsComponent;
  let fixture: ComponentFixture<GuestVisitDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestVisitDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestVisitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
