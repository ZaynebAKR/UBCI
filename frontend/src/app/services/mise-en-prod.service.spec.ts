import { TestBed } from '@angular/core/testing';

import { MiseEnProdService } from './mise-en-prod.service';

describe('MiseEnProdService', () => {
  let service: MiseEnProdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiseEnProdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
