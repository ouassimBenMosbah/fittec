import { TestBed } from '@angular/core/testing';

import { FetchScheduleDataHelperService } from './fetch-schedule-data-helper.service';

describe('FetchScheduleDataHelperService', () => {
  let service: FetchScheduleDataHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchScheduleDataHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
