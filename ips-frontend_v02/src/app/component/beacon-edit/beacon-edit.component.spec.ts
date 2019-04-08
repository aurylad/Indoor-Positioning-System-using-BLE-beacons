import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconEditComponent } from './beacon-edit.component';

describe('BeaconEditComponent', () => {
  let component: BeaconEditComponent;
  let fixture: ComponentFixture<BeaconEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
