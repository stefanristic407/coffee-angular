import { TestBed } from '@angular/core/testing';

import { CuppingReportService } from './cupping-report.service';

describe('CuppingReportService', () => {
  let service: CuppingReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuppingReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
