import { Component, OnInit } from '@angular/core';
import { QuestionDataService } from '../services/question-data.service';
import { QuestaoCustom } from '../questao';

@Component({
  selector: 'app-atualizar-questao',
  templateUrl: './atualizar-questao.page.html',
  styleUrls: ['./atualizar-questao.page.scss'],
})
export class AtualizarQuestaoPage implements OnInit {

  qst: QuestaoCustom;
  textoQuestao: string;

  categorias = ['Matemática', 'Biologia', 'Física',
    'Química', 'Literatura', 'Inglês',
    'História', 'Geografia', 'Artes'].sort();
  categoria = '';

  opcResp = '';
  alternativasResp: Array<string> = [];
  rAlt0 = false;
  rAlt1 = false;
  rAlt2 = false;

  textoLivre = '';

  form = [
    { val: 'Alternativa 1', isChecked: false },
    { val: 'Alternativa 2', isChecked: false },
    { val: 'Alternativa 3', isChecked: false }
  ];

  constructor(private qstDataService: QuestionDataService) { }

  ngOnInit() {
    console.log(this.qstDataService.data);
    this.qst = this.qstDataService.data;
    this.textoQuestao = this.qst.textoQst;
    this.categoria = this.qst.categoria;

    if (this.qst.idCorreta != null) {
      this.opcResp = 'unica';
      this.alternativasResp = this.qst.alternativas;
      if (this.qst.idCorreta === 0) {
        this.rAlt0 = true;
      } else if (this.qst.idCorreta === 1) {
        this.rAlt1 = true;
      } else if (this.qst.idCorreta === 2) {
        this.rAlt2 = true;
      }
    } else if (this.qst.textoLivre != null) {
      this.opcResp = 'texto';
      this.textoLivre = this.qst.textoLivre;
    } else if (this.qst.idCorreta === null && this.qst.textoLivre === null) {
      this.opcResp = 'multipla';
      this.form = this.qst.alternativas;
    }


  }

  categoriaEscolhida(): void {
    console.log(this.categoria);
  }

  setRespAlternativa(value) {

  }
  

}
