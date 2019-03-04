import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconRegComponent } from './beacon-reg.component';

describe('BeaconRegComponent', () => {
  let component: BeaconRegComponent;
  let fixture: ComponentFixture<BeaconRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
