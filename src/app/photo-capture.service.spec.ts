import { TestBed } from '@angular/core/testing';

import { PhotoCaptureService } from './photo-capture.service';

describe('PhotoCaptureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoCaptureService = TestBed.get(PhotoCaptureService);
    expect(service).toBeTruthy();
  });
});
