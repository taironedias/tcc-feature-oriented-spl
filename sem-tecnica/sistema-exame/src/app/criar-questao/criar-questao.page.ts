import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestaoCustomUnica } from '../questao';
import { QueryBindingType } from '@angular/compiler/src/core';
import { QuestaoCustomMultipla } from '../questao2';

@Component({
  selector: 'app-criar-questao',
  templateUrl: './criar-questao.page.html',
  styleUrls: ['./criar-questao.page.scss'],
})
export class CriarQuestaoPage implements OnInit {

  disciplinas = ['Matemática', 'Biologia', 'Física', 'Química', 'Literatura', 'Inglês'];
  textoQuestao = '';
  discpEscolhida = '';
  opcRespostaEscolhida = '';
  idCorretaEscolhida: number;
  alternativa = '';
  alternativasResp: Array<string> = [];
  cont = 0;
  disabledButton = false;

  form = [
    { val: 'Alternativa 1', isChecked: false },
    { val: 'Alternativa 2', isChecked: false },
    { val: 'Alternativa 3', isChecked: false }
  ];
  altCheckbox = '';

  textoLivre = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.alternativasResp.push('Alternativa 1');
    this.alternativasResp.push('Alternativa 2');
    this.alternativasResp.push('Alternativa 3');
  }

  createQuestion() {
    if (this.opcRespostaEscolhida === 'unica') {
      const qst = new QuestaoCustomUnica();
      qst.textoQst = this.textoQuestao;
      qst.categoria = this.discpEscolhida;
      qst.alternativas = this.alternativasResp;
      qst.idCorreta = this.idCorretaEscolhida;
      console.log(qst);
    } else if (this.opcRespostaEscolhida === 'multipla') {
      const qst = new QuestaoCustomMultipla();
      qst.textoQst = this.textoQuestao;
      qst.categoria = this.discpEscolhida;
      qst.alternativas = this.form;
      console.log(qst);
    } else if (this.opcRespostaEscolhida === 'texto') {
      console.log(this.textoLivre);
    }
    console.log(this.opcRespostaEscolhida);
  }

  setDisciplina(value) {
    this.discpEscolhida = value;
  }

  setOpcResposta(value) {
    this.opcRespostaEscolhida = value;
  }

  addAlternativa() {
    this.alternativasResp[this.cont] = this.alternativa;
    this.cont += 1;
    this.alternativa = '';
    if (this.cont === 3) {
      this.disabledButton = true;
    }
  }

  setRespAlternativa(value) {
    this.idCorretaEscolhida = parseInt(value);
  }


  /* MULTIPLA ESCOLHA */

  addCheckbox() {
    this.form[this.cont].val = this.altCheckbox;
    this.cont += 1;
    this.altCheckbox = '';
    if (this.cont === 3) {
      this.disabledButton = true;
    }
  }

  // ngOnDestroy(){
  //   this.router.navigate(['home']);
  // }

}
