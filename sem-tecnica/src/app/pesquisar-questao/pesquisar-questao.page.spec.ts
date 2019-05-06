import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarQuestaoPage } from './pesquisar-questao.page';

describe('PesquisarQuestaoPage', () => {
  let component: PesquisarQuestaoPage;
  let fixture: ComponentFixture<PesquisarQuestaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarQuestaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarQuestaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
