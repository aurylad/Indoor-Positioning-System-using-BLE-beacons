import { TestBed } from '@angular/core/testing';

import { WorkLogsService } from './work-logs.service';

describe('WorkLogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkLogsService = TestBed.get(WorkLogsService);
    expect(service).toBeTruthy();
  });
});
