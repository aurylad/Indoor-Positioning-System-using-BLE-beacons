import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeRenderingComponent } from './real-time-rendering.component';

describe('RealTimeRenderingComponent', () => {
  let component: RealTimeRenderingComponent;
  let fixture: ComponentFixture<RealTimeRenderingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeRenderingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
