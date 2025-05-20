/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StateServiceService } from './stateService.service';

describe('Service: StateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateServiceService]
    });
  });

  it('should ...', inject([StateServiceService], (service: StateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
