import { TestBed } from '@angular/core/testing';

import { ProcessDetailsService } from './process-details.service';

describe('ProcessDetailsService', () => {
  let service: ProcessDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
