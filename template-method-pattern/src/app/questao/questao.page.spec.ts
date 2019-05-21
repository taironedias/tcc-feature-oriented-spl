import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestaoPage } from './questao.page';

describe('QuestaoPage', () => {
  let component: QuestaoPage;
  let fixture: ComponentFixture<QuestaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
