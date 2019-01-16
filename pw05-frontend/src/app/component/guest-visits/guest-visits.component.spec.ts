import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestVisitsComponent } from './guest-visits.component';

describe('GuestVisitsComponent', () => {
  let component: GuestVisitsComponent;
  let fixture: ComponentFixture<GuestVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
