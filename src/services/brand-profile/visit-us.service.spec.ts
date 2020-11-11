import { TestBed } from '@angular/core/testing';

import { VisitUsService } from './visit-us.service';

describe('VisitUsService', () => {
  let service: VisitUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
