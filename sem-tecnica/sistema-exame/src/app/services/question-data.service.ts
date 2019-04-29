import { Injectable } from '@angular/core';
import { QuestaoCustom } from '../questao';

@Injectable({
  providedIn: 'root'
})
export class QuestionDataService {

  public itens: Array<QuestaoCustom> = [];

  constructor() { }

  filtroItens(termoPesquisa) {
    return this.itens.filter(item => {
      // return item.textoQst.toLowerCase().indexOf(termoPesquisa.toLowerCase()) > -1;
      return item.textoQst.toLowerCase().indexOf(termoPesquisa.toLowerCase()) > -1 ||
      item.categoria.toLowerCase().indexOf(termoPesquisa.toLowerCase()) > -1;
    });
  }


}
