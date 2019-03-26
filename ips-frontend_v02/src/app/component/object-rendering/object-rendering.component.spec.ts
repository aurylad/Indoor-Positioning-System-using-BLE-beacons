import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectRenderingComponent } from './object-rendering.component';

describe('ObjectRenderingComponent', () => {
  let component: ObjectRenderingComponent;
  let fixture: ComponentFixture<ObjectRenderingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectRenderingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
