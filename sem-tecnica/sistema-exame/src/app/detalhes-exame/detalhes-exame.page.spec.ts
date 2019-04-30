import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesExamePage } from './detalhes-exame.page';

describe('DetalhesExamePage', () => {
  let component: DetalhesExamePage;
  let fixture: ComponentFixture<DetalhesExamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesExamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesExamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
