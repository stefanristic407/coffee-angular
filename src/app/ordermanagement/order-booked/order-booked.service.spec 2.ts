import { TestBed } from '@angular/core/testing';

import { OrderBookedService } from './order-booked.service';

describe('OrderBookedService', () => {
  let service: OrderBookedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderBookedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
