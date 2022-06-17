import { TestBed } from '@angular/core/testing';

import { CustomEventTitleFormatter } from './custom-event-title-formatter.service';

describe('CustomEventTitleFormatterService', () => {
  let service: CustomEventTitleFormatter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomEventTitleFormatter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
