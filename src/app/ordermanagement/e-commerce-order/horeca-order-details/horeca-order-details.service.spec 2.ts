import { TestBed } from '@angular/core/testing';

import { HorecaOrderDetailsService } from './horeca-order-details.service';

describe('HorecaOrderDetailsService', () => {
  let service: HorecaOrderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorecaOrderDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
