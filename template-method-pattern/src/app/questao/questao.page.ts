import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestaoCustom } from '../questao';
import { AlertController } from '@ionic/angular';
import { QuestionDataService } from '../services/question-data.service';
import { ConfigSubjectService } from '../services/subject.service';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.page.html',
  styleUrls: ['./questao.page.scss'],
})
export abstract class QuestaoPage implements OnInit {

  protected title: string;
  protected lQuestionText: string;
  protected textoQuestao: string;
  protected lCategoriaText: string;
  protected categoria: string;
  protected categorias = ['Matemática', 'Biologia', 'Física',
    'Química', 'Literatura', 'Inglês',
    'História', 'Geografia', 'Artes'].sort();
  protected createPage: boolean;
  protected opcResposta: string;
  protected altRadio: string;
  protected disabledButton = false;
  protected formRadio = [
    { val: 'Alternativa 1', isChecked: false },
    { val: 'Alternativa 2', isChecked: false },
    { val: 'Alternativa 3', isChecked: false }
  ];
  protected altCheck: string;
  protected formCheck = [
    { val: 'Alternativa 1', isChecked: false },
    { val: 'Alternativa 2', isChecked: false },
    { val: 'Alternativa 3', isChecked: false }
  ];
  protected lTextoLivreText: string;
  protected textoLivre: string;
  protected level: boolean;
  protected nivel: string;
  protected niveis = ['1', '2', '3'];
  protected buttonText: string;

  protected cont = 0;
  protected config;
  public listQuestions: Array<QuestaoCustom> = [];


  constructor(protected configService: ConfigSubjectService,
    protected qstDataService: QuestionDataService,
    protected router: Router,
    protected alertCtrl: AlertController) { }

  ngOnInit() {
    // this.configService.getInitConfig().subscribe(data => this.config = data);
  }

  // ionViewDidEnter() {
  //   this.level = this.config.level;
  //   this.valuesDefault();
  // }

  abstract actionQuestion();

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

  valuesDefault() {
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
