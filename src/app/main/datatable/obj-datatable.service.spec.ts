import { TestBed } from '@angular/core/testing';

import { ObjDatatableService } from './obj-datatable.service';

describe('ObjDatatableService', () => {
  let service: ObjDatatableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjDatatableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
