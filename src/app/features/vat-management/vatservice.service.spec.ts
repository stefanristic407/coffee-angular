import { TestBed } from '@angular/core/testing';

import { VatserviceService } from './vatservice.service';

describe('VatserviceService', () => {
  let service: VatserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
