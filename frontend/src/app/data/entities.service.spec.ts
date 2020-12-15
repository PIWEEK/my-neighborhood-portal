import { TestBed } from '@angular/core/testing';

import { CollectivesService } from './collectives.service';

describe('CollectivesService', () => {
  let service: CollectivesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectivesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
