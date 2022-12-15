import { TestBed } from '@angular/core/testing';

import { DevdacticLibService } from './devdactic-lib.service';

describe('DevdacticLibService', () => {
  let service: DevdacticLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevdacticLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
