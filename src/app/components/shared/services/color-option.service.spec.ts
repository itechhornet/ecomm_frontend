import { TestBed } from '@angular/core/testing';

import { ColorOptionService } from './color-option.service';

describe('ColorOptionService', () => {
  let service: ColorOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
