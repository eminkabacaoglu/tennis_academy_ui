import { TestBed } from '@angular/core/testing';

import { StudentTypeService } from './student-type.service';

describe('StudentTypeService', () => {
  let service: StudentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
