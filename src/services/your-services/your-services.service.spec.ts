import { TestBed } from '@angular/core/testing';

import { YourServicesService } from './your-services.service';

describe('YourServicesService', () => {
  let service: YourServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YourServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
