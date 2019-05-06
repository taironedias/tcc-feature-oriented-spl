import { TestBed } from '@angular/core/testing';

import { QuestionDataService } from './question-data.service';

describe('QuestionDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionDataService = TestBed.get(QuestionDataService);
    expect(service).toBeTruthy();
  });
});
