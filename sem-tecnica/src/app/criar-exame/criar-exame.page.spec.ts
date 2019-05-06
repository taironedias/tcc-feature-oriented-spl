import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarExamePage } from './criar-exame.page';

describe('CriarExamePage', () => {
  let component: CriarExamePage;
  let fixture: ComponentFixture<CriarExamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarExamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarExamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
