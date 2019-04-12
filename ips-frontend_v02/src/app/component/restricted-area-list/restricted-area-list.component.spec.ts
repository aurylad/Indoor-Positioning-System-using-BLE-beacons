import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedAreaListComponent } from './restricted-area-list.component';

describe('RestrictedAreaListComponent', () => {
  let component: RestrictedAreaListComponent;
  let fixture: ComponentFixture<RestrictedAreaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictedAreaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedAreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
