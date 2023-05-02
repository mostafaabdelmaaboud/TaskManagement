import { TestBed } from '@angular/core/testing';

import { ListTasksService } from './list-tasks.service';

describe('ListTasksService', () => {
  let service: ListTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
