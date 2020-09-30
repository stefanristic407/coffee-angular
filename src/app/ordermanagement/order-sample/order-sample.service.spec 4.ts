import { TestBed } from '@angular/core/testing';

import { OrderSampleService } from './order-sample.service';

describe('OrderSampleService', () => {
  let service: OrderSampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderSampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
