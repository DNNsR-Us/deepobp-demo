import { TestBed } from '@angular/core/testing';

import { DeconflictService } from './deconflict.service';

describe('DeconflictService', () => {
  let service: DeconflictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeconflictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
