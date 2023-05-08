import { TestBed } from '@angular/core/testing';

import { TaskUserService } from './task-user.service';

describe('TaskUserService', () => {
  let service: TaskUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
