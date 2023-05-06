import { TestBed } from '@angular/core/testing';

import { MatPaginationIntlService } from './mat-pagination-intl.service';

describe('MatPaginationIntlService', () => {
  let service: MatPaginationIntlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatPaginationIntlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
