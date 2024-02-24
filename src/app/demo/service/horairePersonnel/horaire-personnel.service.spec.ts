import { TestBed } from '@angular/core/testing';

import { HorairePersonnelService } from './horaire-personnel.service';

describe('HorairePersonnelService', () => {
  let service: HorairePersonnelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorairePersonnelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
