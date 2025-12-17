import { TestBed } from '@angular/core/testing';

import { NbrGabService } from './nbr-gab.service';

describe('NbrGabService', () => {
  let service: NbrGabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbrGabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
