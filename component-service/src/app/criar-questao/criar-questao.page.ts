import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuestaoCustom } from '../questao';
import { AlertController } from '@ionic/angular';
import { QuestionDataService } from '../services/question-data.service';
import { NivelComponent } from '../nivel/nivel.component';
import { ConfigService } from '../variability-config/config.service';

@Component({
  selector: 'app-criar-questao',
  templateUrl: './criar-questao.page.html',
  styleUrls: ['./criar-questao.page.scss'],
})
export class CriarQuestaoPage implements OnInit {

  constructor(public qstDataService: QuestionDataService,
    private alertCtrl: AlertController,
    private configS: ConfigService) { }

  public listQuestions: Array<QuestaoCustom> = [];

  disciplinas = ['Matemática', 'Biologia', 'Física',
    'Química', 'Literatura', 'Inglês',
    'História', 'Geografia', 'Artes'].sort();
  textoQuestao = '';
  disciplina: string;
  opcResposta = '';
  alternativa = '';
  formRadio = [
    { val: 'Alternativa 1', isChecked: false },
    { val: 'Alternativa 2', isChecked: false },
    { val: 'Alternativa 3', isChecked: false }
  ];
  cont = 0;
  disabledButton = false;

  form = [
    { val: 'Alternativa 1', isChecked: false },
    { val: 'Alternativa 2', isChecked: false },
    { val: 'Alternativa 3', isChecked: false }
  ];
  altCheckbox = '';

  textoLivre: string;

  level: boolean;
  @ViewChild(NivelComponent) nivelComponent;
  receberNivel: string;

  ngOnInit() {
    this.valuesDefault();
    this.configS.getInitConfig()
      .subscribe(data => this.level = data.level);
  }

  ionViewDidEnter() {
    console.log(this.level);
  }

  resetCampos() {
    this.textoQuestao = null;
    this.disciplina = 'Any';
    this.opcResposta = '';
    this.alternativa = null;
    this.formRadio = [
      { val: 'Alternativa 1', isChecked: false },
      { val: 'Alternativa 2', isChecked: false },
      { val: 'Alternativa 3', isChecked: false }
    ];
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

  createQuestion() {
    if (this.level) {
      this.receberNivel = this.nivelComponent.nivel;
      console.log(this.receberNivel);
    }
    if (this.textoQuestao === null || this.textoQuestao === '') {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de questão válido.');
    } else if (this.disciplina === null || this.disciplina === '') {
      this.showAlert('Aviso!', 'Por favor, forneça uma categoria de resposta válida.');
    } else if (this.opcResposta === 'texto' && (this.textoLivre === null || this.textoLivre === '')) {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
    } else {

      const qst = new QuestaoCustom();
      qst.textoQst = this.textoQuestao;
      qst.categoria = this.disciplina;
      if (this.level) {
        qst.nivelDificuldade = this.receberNivel;
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
        qst.alternativas = this.form;
        qst.opcEscolha = this.opcResposta;
        qst.textoLivre = null;
      }

      console.log(qst);
      qst.id = this.gerarID();
      this.qstDataService.itens.push(qst);
      this.showAlert('Questão', 'Questão adicionada com sucesso!');
      this.resetCampos();
      if (this.level) {
        this.nivelComponent.valuesReset();
      }
    }
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
  }

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

    for (let i = 0; i < 3; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
  }

  valuesDefault() {
    const qst = new QuestaoCustom();
    qst.textoQst = 'Qual o time que mais vezes foi campeão brasileiro?';
    qst.categoria = 'História';
    qst.nivelDificuldade = '1';
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
    qst2.nivelDificuldade = '2';
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
    qst3.nivelDificuldade = '3';
    qst3.alternativas = null;
    qst3.opcEscolha = 'texto';
    qst3.textoLivre = 'Cruzeiro';
    qst3.id = this.gerarID();
    this.qstDataService.itens.push(qst3);
  }

}
