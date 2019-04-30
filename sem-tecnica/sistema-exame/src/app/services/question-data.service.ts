import { Injectable } from '@angular/core';
import { QuestaoCustom } from '../questao';
import { ExameCustom } from '../exame';

@Injectable({
  providedIn: 'root'
})
export class QuestionDataService {

  public data: QuestaoCustom;
  public itens: Array<QuestaoCustom> = [];
  public examesArray: Array<ExameCustom> = [];

  constructor() { }

  filtroItens(termoPesquisa) {
    return this.itens.filter(item => {
      // return item.textoQst.toLowerCase().indexOf(termoPesquisa.toLowerCase()) > -1;
      return item.textoQst.toLowerCase().indexOf(termoPesquisa.toLowerCase()) > -1 ||
      item.categoria.toLowerCase().indexOf(termoPesquisa.toLowerCase()) > -1;
    });
  }


}
