import { TestBed } from '@angular/core/testing';

import { FileShareDetailsService } from './file-share-details.service';

describe('FileShareDetailsService', () => {
  let service: FileShareDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileShareDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
