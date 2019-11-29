import { TestBed } from '@angular/core/testing';

import { AdminQueryService } from './admin-query.service';

describe('AdminQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminQueryService = TestBed.get(AdminQueryService);
    expect(service).toBeTruthy();
  });
});
