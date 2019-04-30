import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestaoCustom } from '../questao';
import { AlertController } from '@ionic/angular';
import { range } from 'rxjs';
import { QuestionDataService } from '../services/question-data.service';

@Component({
  selector: 'app-criar-questao',
  templateUrl: './criar-questao.page.html',
  styleUrls: ['./criar-questao.page.scss'],
})
export class CriarQuestaoPage implements OnInit {

  public listQuestions: Array<QuestaoCustom> = [];

  disciplinas = ['Matemática', 'Biologia', 'Física',
    'Química', 'Literatura', 'Inglês',
    'História', 'Geografia', 'Artes'];
  textoQuestao = '';
  discpEscolhida: string;
  opcRespostaEscolhida = '';
  idCorretaEscolhida: number;
  alternativa = '';
  formRadio = [
    { val: 'Alternativa 1', isChecked: false },
    { val: 'Alternativa 2', isChecked: false },
    { val: 'Alternativa 3', isChecked: false }
  ];
  alternativasResp: Array<string> = [];
  cont = 0;
  disabledButton = false;

  form = [
    { val: 'Alternativa 1', isChecked: false },
    { val: 'Alternativa 2', isChecked: false },
    { val: 'Alternativa 3', isChecked: false }
  ];
  altCheckbox = '';

  textoLivre: string;

  resetCampos() {
    this.disciplinas.sort();
    this.textoQuestao = null;
    this.opcRespostaEscolhida = null;
    this.idCorretaEscolhida = null;
    this.alternativa = null;
    this.alternativasResp = [];
    this.alternativasResp.push('Alternativa 1');
    this.alternativasResp.push('Alternativa 2');
    this.alternativasResp.push('Alternativa 3');
    this.cont = 0;
    this.disabledButton = false;
    this.form = [
      { val: 'Alternativa 1', isChecked: false },
      { val: 'Alternativa 2', isChecked: false },
      { val: 'Alternativa 3', isChecked: false }
    ];
    this.altCheckbox = null;
    this.textoLivre = null;
  }

  constructor(private qstDataService: QuestionDataService,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    // this.resetCampos();
    this.valuesDefault();
  }

  createQuestion() {

    if (this.textoQuestao === null || this.textoQuestao === '') {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de questão válido.');
    } else if (this.discpEscolhida === null || this.discpEscolhida === '') {
      this.showAlert('Aviso!', 'Por favor, forneça uma categoria de resposta válida.');
    } else if (this.opcRespostaEscolhida === 'texto' && (this.textoLivre === null || this.textoLivre === '')) {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
    } else {

      const qst = new QuestaoCustom();
      qst.textoQst = this.textoQuestao;
      qst.categoria = this.discpEscolhida;
      if (this.opcRespostaEscolhida === 'unica') {
        qst.alternativas = this.formRadio;
        qst.opcEscolha = this.opcRespostaEscolhida;
        qst.textoLivre = null;
      } else if (this.opcRespostaEscolhida === 'texto') {
        if (this.textoLivre === null || this.textoLivre === '') {
          this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
        }
        qst.alternativas = null;
        qst.opcEscolha = this.opcRespostaEscolhida;
        qst.textoLivre = this.textoLivre;
      } else if (this.opcRespostaEscolhida === 'multipla') {
        qst.alternativas = this.form;
        qst.opcEscolha = this.opcRespostaEscolhida;
        qst.textoLivre = null;
      }

      console.log(qst);
      qst.id = this.gerarID();
      this.qstDataService.itens.push(qst);
      this.showAlert('Questão', 'Questão enviada com sucesso!');
      this.resetCampos();
    }
  }

  setDisciplina(value) {
    this.discpEscolhida = value;
  }

  setOpcResposta(value) {
    this.opcRespostaEscolhida = value;
  }

  addAlternativa() {
    this.formRadio[this.cont].val = this.alternativa;
    this.cont += 1;
    this.alternativa = '';
    if (this.cont === 3) {
      this.disabledButton = true;
    }
  }

  setRespAlternativa(value) {
    this.formRadio[value].isChecked = true;
    // this.idCorretaEscolhida = parseInt(value);
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

  async showAlert(title: string, msg: string) {
    const alerta = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: ['OK']
    });
    await alerta.present();
  }

  gerarID(): string {
    let outString = '';
    const inOptions = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 20; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
  }

  valuesDefault() {
    const qst = new QuestaoCustom();
    qst.textoQst = 'Qual o time que mais vezes foi campeão brasileiro?';
    qst.categoria = 'História';
    qst.alternativas = [
      { val: 'Bahia', isChecked: false },
      { val: 'Palmeiras', isChecked: true },
      { val: 'Grêmio', isChecked: false }
    ];
    qst.opcEscolha = 'unica';
    qst.textoLivre = null;
    qst.id = this.gerarID();
    this.qstDataService.itens.push(qst);

    const qst2 = new QuestaoCustom();
    qst2.textoQst = 'Quais times vencedores da Libertadores?';
    qst2.categoria = 'História';
    qst2.alternativas = [
      { val: 'Santos', isChecked: true },
      { val: 'São Paulo', isChecked: true },
      { val: 'Vitória', isChecked: false }
    ];
    qst2.opcEscolha = 'multipla';
    qst2.textoLivre = null;
    qst2.id = this.gerarID();
    this.qstDataService.itens.push(qst2);

    const qst3 = new QuestaoCustom();
    qst3.textoQst = 'Qual time foi campeão da Copa do Brasil de 2018?';
    qst3.categoria = 'Física';
    qst3.alternativas = null;
    qst3.opcEscolha = 'texto';
    qst3.textoLivre = 'Cruzeiro';
    qst3.id = this.gerarID();
    this.qstDataService.itens.push(qst3);
  }

}
