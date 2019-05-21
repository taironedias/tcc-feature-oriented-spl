import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../question/iquestion';
import { QuestaoCustom } from '../questao';
import { ConfigSubjectService } from '../services/config-subject.service';
import { QuestionDataService } from '../services/question-data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-question-create',
  templateUrl: '../question/question.page.html',
  styleUrls: ['../question/question.page.scss'],
})
export class QuestionCreatePage implements OnInit, IQuestion {

  title = 'Criar Questão';
  lQuestionText = 'Escreva o texto da questão:';
  textoQuestao: string;
  lCategoriaText = 'Escolha a categoria:';
  categoria: string;
  categorias = ['Matemática', 'Biologia', 'Física',
    'Química', 'Literatura', 'Inglês',
    'História', 'Geografia', 'Artes'].sort();
  createPage = true;
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
  lTextoLivreText = 'Escreva o que seria uma resposta adequada:';
  textoLivre: string;
  level: boolean;
  nivel: string;
  niveis = ['1', '2', '3'];
  buttonText = 'Criar';

  cont = 0;

  constructor(private configS: ConfigSubjectService,
              protected qstDataService: QuestionDataService,
              protected alertCtrl: AlertController) { }

  ngOnInit() {
    this.configS.getInitConfig()
      .subscribe(data => this.level = data.level);
    console.log(this.title);
  }

  ionViewDidEnter() {
    this.defaultValues();
  }

  actionQuestion() {

    if (this.textoQuestao === null || this.textoQuestao === '') {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de questão válido.');
    } else if (this.categoria === null || this.categoria === '') {
      this.showAlert('Aviso!', 'Por favor, forneça uma categoria de resposta válida.');
    } else if (this.opcResposta === 'texto' && (this.textoLivre === null || this.textoLivre === '')) {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
    } else {

      const qst = new QuestaoCustom();
      qst.textoQst = this.textoQuestao;
      qst.categoria = this.categoria;
      if (this.level) {
        qst.nivelDificuldade = this.nivel;
      }
      if (this.opcResposta === 'unica') {
        qst.alternativas = this.formRadio;
        qst.opcEscolha = this.opcResposta;
        qst.textoLivre = null;
      } else if (this.opcResposta === 'texto') {
        if (this.textoLivre === null || this.textoLivre === '') {
          this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
        }
        qst.alternativas = null;
        qst.opcEscolha = this.opcResposta;
        qst.textoLivre = this.textoLivre;
      } else if (this.opcResposta === 'multipla') {
        qst.alternativas = this.formCheck;
        qst.opcEscolha = this.opcResposta;
        qst.textoLivre = null;
      }

      console.log(qst);
      qst.id = this.gerarID();
      this.qstDataService.itens.push(qst);
      this.showAlert('Questão', 'Questão adicionada com sucesso!');
      this.resetCampos();
    }
  }

  resetCampos() {
    this.categoria = 'Any';
    this.nivel = '-1';
    this.textoQuestao = null;
    this.opcResposta = null;
    this.altRadio = null;
    this.formRadio = [
      { val: 'Alternativa 1', isChecked: false },
      { val: 'Alternativa 2', isChecked: false },
      { val: 'Alternativa 3', isChecked: false }
    ];
    this.cont = 0;
    this.disabledButton = false;
    this.formCheck = [
      { val: 'Alternativa 1', isChecked: false },
      { val: 'Alternativa 2', isChecked: false },
      { val: 'Alternativa 3', isChecked: false }
    ];
    this.altCheck = null;
    this.textoLivre = null;
  }

  setRespAlternativa(value) {
    for (let i = 0; i < this.formRadio.length; i++) {
      this.formRadio[i].isChecked = false;
    }
    this.formRadio[value].isChecked = true;
  }

  addAlternativa() {
    this.formRadio[this.cont].val = this.altRadio;
    this.cont += 1;
    this.altRadio = '';
    if (this.cont === 3) {
      this.disabledButton = true;
    }
  }

  addCheckbox() {
    this.formCheck[this.cont].val = this.altCheck;
    this.cont += 1;
    this.altCheck = '';
    if (this.cont === 3) {
      this.disabledButton = true;
    }
  }

  gerarID(): string {
    let outString = '';
    const inOptions = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 3; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
  }

  async showAlert(title: string, msg: string) {
    const alerta = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: ['OK']
    });
    await alerta.present();
  }

  defaultValues() {
    const qst = new QuestaoCustom();
    qst.textoQst = 'Qual o time que mais vezes foi campeão brasileiro?';
    qst.categoria = 'História';
    if (this.level) {
      qst.nivelDificuldade = '1';
    }
    qst.alternativas = [
      { val: 'Bahia', isChecked: false },
      { val: 'Palmeiras', isChecked: true },
      { val: 'Grêmio', isChecked: false }
    ];
    qst.opcEscolha = 'unica';
    qst.textoLivre = null;
    qst.id = 'a8E';
    this.qstDataService.itens.push(qst);

    const qst2 = new QuestaoCustom();
    qst2.textoQst = 'Quais times vencedores da Libertadores?';
    qst2.categoria = 'História';
    if (this.level) {
      qst2.nivelDificuldade = '2';
    }
    qst2.alternativas = [
      { val: 'Santos', isChecked: true },
      { val: 'São Paulo', isChecked: true },
      { val: 'Vitória', isChecked: false }
    ];
    qst2.opcEscolha = 'multipla';
    qst2.textoLivre = null;
    qst2.id = 'NuI';
    this.qstDataService.itens.push(qst2);

    const qst3 = new QuestaoCustom();
    qst3.textoQst = 'Qual time foi campeão da Copa do Brasil de 2018?';
    qst3.categoria = 'Física';
    if (this.level) {
      qst3.nivelDificuldade = '3';
    }
    qst3.alternativas = null;
    qst3.opcEscolha = 'texto';
    qst3.textoLivre = 'Cruzeiro';
    qst3.id = 'T93';
    this.qstDataService.itens.push(qst3);
  }

}
