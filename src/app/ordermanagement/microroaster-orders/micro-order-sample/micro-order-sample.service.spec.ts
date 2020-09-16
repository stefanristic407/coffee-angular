import { TestBed } from '@angular/core/testing';

import { MicroOrderSampleService } from './micro-order-sample.service';

describe('MicroOrderSampleService', () => {
  let service: MicroOrderSampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroOrderSampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
