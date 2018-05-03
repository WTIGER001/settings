import { TestBed, inject } from '@angular/core/testing';

import { CommonDialogService } from './common-dialog.service';

describe('CommonDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonDialogService]
    });
  });

  it('should be created', inject([CommonDialogService], (service: CommonDialogService) => {
    expect(service).toBeTruthy();
  }));
});
