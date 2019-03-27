import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedAreaRegComponent } from './restricted-area-reg.component';

describe('RestrictedAreaRegComponent', () => {
  let component: RestrictedAreaRegComponent;
  let fixture: ComponentFixture<RestrictedAreaRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictedAreaRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedAreaRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
