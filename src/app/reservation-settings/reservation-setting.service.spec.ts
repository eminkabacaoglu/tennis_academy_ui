import { TestBed } from '@angular/core/testing';

import { ReservationSettingService } from './reservation-setting.service';

describe('ReservationSettingService', () => {
  let service: ReservationSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
