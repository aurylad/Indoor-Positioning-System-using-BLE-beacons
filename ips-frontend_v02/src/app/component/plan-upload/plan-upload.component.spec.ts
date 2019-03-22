import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdplanUploadBasicComponent } from './plan-upload.component';

describe('PlanUploadComponent', () => {
  let component: NgbdplanUploadBasicComponent;
  let fixture: ComponentFixture<NgbdplanUploadBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdplanUploadBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdplanUploadBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
