import { TestBed } from '@angular/core/testing';

import { MembershipStatusService } from './membership-status.service';

describe('MembershipService', () => {
  let service: MembershipStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
