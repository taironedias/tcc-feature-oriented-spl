import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCreatePage } from './question-create.page';

describe('QuestionCreatePage', () => {
  let component: QuestionCreatePage;
  let fixture: ComponentFixture<QuestionCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
