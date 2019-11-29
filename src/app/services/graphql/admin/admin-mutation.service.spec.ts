import { TestBed } from '@angular/core/testing';

import { AdminMutationService } from './admin-mutation.service';

describe('AdminMutationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminMutationService = TestBed.get(AdminMutationService);
    expect(service).toBeTruthy();
  });
});
