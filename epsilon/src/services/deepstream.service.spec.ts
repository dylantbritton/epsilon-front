import { TestBed, inject } from '@angular/core/testing';

import { DeepstreamService } from './deepstream.service';

describe('DeepstreamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeepstreamService]
    });
  });

  it('should be created', inject([DeepstreamService], (service: DeepstreamService) => {
    expect(service).toBeTruthy();
  }));
});
