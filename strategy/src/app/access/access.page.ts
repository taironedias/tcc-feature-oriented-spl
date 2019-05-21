import { Component, OnInit, Injector } from '@angular/core';
import { QuestionDataService } from '../services/question-data.service';
import { ExameCustom } from '../exame';
import { QuestaoCustom } from '../questao';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { IAcessoStrategy } from './iacesso';
import { AccessStrategyToken } from './token';

@Component({
  selector: 'app-access',
  templateUrl: './access.page.html',
  styleUrls: ['./access.page.scss'],
})
export class AccessPage implements OnInit {

  label1 = '';
  label2 = '';
  public chosenAccess: IAcessoStrategy;

  constructor(public questData: QuestionDataService,
    public alertCtrl: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private injector: Injector) { }

  ngOnInit() {
    const data = this.route.snapshot.paramMap.get('data');
    this.chosenAccess = this.getServiceByName(data);
    this.valuesDefault();
  }

  getServiceByName(nameService: string) {
    return this.injector.get(AccessStrategyToken)
      .find(x => x.constructor.name === nameService);
  }

  loading() {
    this.chosenAccess.label1 = this.label1;
    this.chosenAccess.label2 = this.label2;
    const nav = this.chosenAccess.makeAction(this.questData);
    this.resetValues();
    this.router.navigate(nav);

    if (this.chosenAccess.callback) {
      this.showAlert('Aviso!', this.chosenAccess.callback);
      this.chosenAccess.callback = '';
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

  resetValues() {
    this.label1 = '';
    this.label2 = '';
  }

  valuesDefault(): QuestionDataService {
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
    qst.id = '1111';

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
    qst2.id = '2222';

    const qst3 = new QuestaoCustom();
    qst3.textoQst = 'Qual time foi campeão da Copa do Brasil de 2018?';
    qst3.categoria = 'Física';
    qst3.alternativas = null;
    qst3.opcEscolha = 'texto';
    qst3.textoLivre = 'Cruzeiro';
    qst3.id = '3333';

    const exame = new ExameCustom();
    exame.nameExame = 'Default System';

    exame.questoes.push(qst);
    exame.questoes.push(qst2);
    exame.questoes.push(qst3);
    exame.key = 'mendouce';

    // let qstData = new QuestionDataService();
    this.questData.examesArray.push(exame);
    return this.questData;
  }

}
