import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarQuestaoPage } from './selecionar-questao.page';

describe('SelecionarQuestaoPage', () => {
  let component: SelecionarQuestaoPage;
  let fixture: ComponentFixture<SelecionarQuestaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionarQuestaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarQuestaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
