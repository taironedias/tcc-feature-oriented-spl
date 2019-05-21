import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionUpdatePage } from './question-update.page';

describe('QuestionUpdatePage', () => {
  let component: QuestionUpdatePage;
  let fixture: ComponentFixture<QuestionUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
