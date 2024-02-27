import { TestBed } from '@angular/core/testing';

import { CommisionServiceService } from './commision-service.service';

describe('CommisionServiceService', () => {
  let service: CommisionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommisionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
