import { Component, OnInit } from '@angular/core';
import { QuestionDataService } from '../services/question-data.service';
import { QuestaoCustom } from '../questao';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atualizar-questao',
  templateUrl: './atualizar-questao.page.html',
  styleUrls: ['./atualizar-questao.page.scss'],
})
export class AtualizarQuestaoPage implements OnInit {

  qst: QuestaoCustom;
  textoQuestao: string;

  niveis = ['1', '2', '3'];
  categorias = ['Matemática', 'Biologia', 'Física',
    'Química', 'Literatura', 'Inglês',
    'História', 'Geografia', 'Artes'].sort();
  categoria = '';
  nivel = '';
  opcResp = '';
  formRadio = [
    { val: 'Alternativa 1', isChecked: true },
    { val: 'Alternativa 2', isChecked: false },
    { val: 'Alternativa 3', isChecked: false }
  ];

  textoLivre = '';

  form = [
    { val: 'Alternativa 1', isChecked: false },
    { val: 'Alternativa 2', isChecked: false },
    { val: 'Alternativa 3', isChecked: false }
  ];

  constructor(private qstDataService: QuestionDataService,
              private alertCtrl: AlertController,
              private router: Router) { }

  ngOnInit() {
    // console.log(this.qstDataService.data);
    this.qst = this.qstDataService.data;
    this.textoQuestao = this.qst.textoQst;
    this.categoria = this.qst.categoria;
    this.nivel = this.qst.nivelDificuldade;

    if (this.qst.opcEscolha === 'unica') {
      this.opcResp = this.qst.opcEscolha;
      this.formRadio = this.qst.alternativas;
    } else if (this.qst.opcEscolha === 'multipla') {
      this.opcResp = this.qst.opcEscolha;
      this.form = this.qst.alternativas;
    } else if (this.qst.opcEscolha === 'texto') {
      this.opcResp = this.qst.opcEscolha;
      this.textoLivre = this.qst.textoLivre;
    }
  }

  setRespAlternativa(value) {
    // tslint:disable-next-line: forin
    for (let i in this.formRadio) {
      if (i === value) {
        this.formRadio[i].isChecked = true;
      } else {
        this.formRadio[i].isChecked = false;
      }
      console.log(this.formRadio[i]);
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

  updateQuestion() {
    if (this.textoQuestao === null || this.textoQuestao === '') {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de questão válido.');
    } else if (this.categoria === null || this.categoria === '') {
      this.showAlert('Aviso!', 'Por favor, forneça uma categoria de resposta válida.');
    } else if (this.opcResp === 'texto' && (this.textoLivre === null || this.textoLivre === '')) {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
    } else {


      this.qst.textoQst = this.textoQuestao;
      this.qst.categoria = this.categoria;
      this.qst.nivelDificuldade = this.nivel;
      if (this.opcResp === 'unica') {
        this.qst.alternativas = this.formRadio;
        this.qst.textoLivre = null;
      } else if (this.opcResp === 'texto') {
        if (this.textoLivre === null || this.textoLivre === '') {
          this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
        }
        this.qst.alternativas = null;
        this.qst.textoLivre = this.textoLivre;
      } else if (this.opcResp === 'multipla') {
        this.qst.alternativas = this.form;
        this.qst.textoLivre = null;
      }

      for (let k in this.qstDataService.itens) {
        if (this.qstDataService.itens[k].id === this.qst.id) {
          this.qstDataService.itens[k] = this.qst;
        }
      }

      console.log(this.qstDataService.itens);
      this.showAlert('Update', 'Questão atualizada com sucesso!');
      this.router.navigate(['tabs/pesquisar-questao']);
    }
  }
}
