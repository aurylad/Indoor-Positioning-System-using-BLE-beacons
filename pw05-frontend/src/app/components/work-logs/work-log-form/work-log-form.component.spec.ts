import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLogFormComponent } from './work-log-form.component';

describe('WorkLogFormComponent', () => {
  let component: WorkLogFormComponent;
  let fixture: ComponentFixture<WorkLogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkLogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
