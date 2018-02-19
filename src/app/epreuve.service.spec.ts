import { TestBed, inject } from '@angular/core/testing';

import { EpreuveService } from './epreuve.service';

describe('EpreuveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpreuveService]
    });
  });

  it('should be created', inject([EpreuveService], (service: EpreuveService) => {
    expect(service).toBeTruthy();
  }));
});
