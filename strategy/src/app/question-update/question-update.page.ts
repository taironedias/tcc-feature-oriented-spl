import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../question/iquestion';
import { QuestaoCustom } from '../questao';
import { ConfigSubjectService } from '../services/config-subject.service';
import { QuestionDataService } from '../services/question-data.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-update',
  templateUrl: '../question/question.page.html',
  styleUrls: ['../question/question.page.scss'],
})
export class QuestionUpdatePage implements OnInit, IQuestion {

  title = 'Atualizar Questão';
  lQuestionText = 'Texto da questão:';
  textoQuestao: string;
  lCategoriaText = 'Categoria:';
  categoria: string;
  categorias = ['Matemática', 'Biologia', 'Física',
    'Química', 'Literatura', 'Inglês',
    'História', 'Geografia', 'Artes'].sort();
  createPage = false;
  opcResposta: string;
  altRadio: string;
  disabledButton = false;
  formRadio = [
    { val: 'Alternativa 1', isChecked: false },
    { val: 'Alternativa 2', isChecked: false },
    { val: 'Alternativa 3', isChecked: false }
  ];
  altCheck: string;
  formCheck = [
    { val: 'Alternativa 1', isChecked: false },
    { val: 'Alternativa 2', isChecked: false },
    { val: 'Alternativa 3', isChecked: false }
  ];
  lTextoLivreText = 'Texto da resposta:';
  textoLivre: string;
  level: boolean;
  nivel: string;
  niveis = ['1', '2', '3'];
  buttonText = 'Atualizar New';

  cont = 0;
  private qst: QuestaoCustom;

  constructor(private configS: ConfigSubjectService,
              protected qstDataService: QuestionDataService,
              protected alertCtrl: AlertController,
              private router: Router) { }

  ngOnInit() {
    this.configS.getInitConfig()
      .subscribe(data => this.level = data.level);
    console.log(this.title);

    this.qst = this.qstDataService.data;
    this.textoQuestao = this.qst.textoQst;
    this.categoria = this.qst.categoria;

    if (this.qst.opcEscolha === 'unica') {
      this.opcResposta = this.qst.opcEscolha;
      this.formRadio = this.qst.alternativas;
    } else if (this.qst.opcEscolha === 'multipla') {
      this.opcResposta = this.qst.opcEscolha;
      this.formCheck = this.qst.alternativas;
    } else if (this.qst.opcEscolha === 'texto') {
      this.opcResposta = this.qst.opcEscolha;
      this.textoLivre = this.qst.textoLivre;
    }
  }

  ionViewDidEnter() {
    if (this.level) {
      this.nivel = this.qst.nivelDificuldade;
    }
  }

  actionQuestion() {
    if (this.textoQuestao === null || this.textoQuestao === '') {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de questão válido.');
    } else if (this.categoria === null || this.categoria === '') {
      this.showAlert('Aviso!', 'Por favor, forneça uma categoria de resposta válida.');
    } else if (this.opcResposta === 'texto' && (this.textoLivre === null || this.textoLivre === '')) {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
    } else {


      this.qst.textoQst = this.textoQuestao;
      this.qst.categoria = this.categoria;
      if (this.level) {
        this.qst.nivelDificuldade = this.nivel;
      }
      if (this.opcResposta === 'unica') {
        this.qst.alternativas = this.formRadio;
        this.qst.textoLivre = null;
      } else if (this.opcResposta === 'texto') {
        if (this.textoLivre === null || this.textoLivre === '') {
          this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
        }
        this.qst.alternativas = null;
        this.qst.textoLivre = this.textoLivre;
      } else if (this.opcResposta === 'multipla') {
        this.qst.alternativas = this.formCheck;
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

  setRespAlternativa(value) {
    for (let i = 0; i < this.formRadio.length; i++) {
      this.formRadio[i].isChecked = false;
    }
    this.formRadio[value].isChecked = true;
  }

  async showAlert(title: string, msg: string) {
    const alerta = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: ['OK']
    });
    await alerta.present();
  }

}
