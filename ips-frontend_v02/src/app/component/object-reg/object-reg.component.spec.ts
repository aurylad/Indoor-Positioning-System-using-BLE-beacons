import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectRegComponent } from './object-reg.component';

describe('ObjectRegComponent', () => {
  let component: ObjectRegComponent;
  let fixture: ComponentFixture<ObjectRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
