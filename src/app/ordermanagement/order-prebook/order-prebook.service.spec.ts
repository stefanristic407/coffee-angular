import { TestBed } from '@angular/core/testing';

import { OrderPrebookService } from './order-prebook.service';

describe('OrderPrebookService', () => {
  let service: OrderPrebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPrebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
