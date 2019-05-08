import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuestaoCustom } from '../questao';
import { ExameCustom } from '../exame';
import { QuestionDataService } from '../services/question-data.service';
import { AlertController } from '@ionic/angular';
import { ConfigService, ACCESS_BASE, LEVEL_BASE } from '../services/config';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.page.html',
  styleUrls: ['./aluno.page.scss'],
})
export class AlunoPage implements OnInit {

  nameStudant = '';
  keyAcesso = '';
  ID = 0;
  flag = false;
  username = '';
  password = '';
  nameButton = '';

  accessKey: boolean;

  constructor(private qstData: QuestionDataService,
              private router: Router,
              private alertCtrl: AlertController,
              private configService: ConfigService,
              @Inject(ACCESS_BASE) accessBase: string) {
    this.accessKey = accessBase === 'key' ? true : false;
  }

  ngOnInit() {
    if (this.qstData.examesArray !== null) {
      this.valuesDefault();
    }
    if (this.accessKey) {
      this.nameButton = 'FAZER EXAME';
    } else {
      this.nameButton = 'LOGIN';
    }
  }

  resetValues() {
    if (this.accessKey) {
      this.nameStudant = '';
      this.keyAcesso = '';
      this.ID = 0;
      this.flag = false;
    } else {
      this.username = '';
      this.password = '';
    }
    this.nameButton = '';
  }

  makeExame() {
    if (this.accessKey) {
      if (this.nameStudant === '' || this.nameStudant === null) {
        this.showAlert('Aviso', 'O campo nome do aluno deve ser preenchido!');
      } else if (this.keyAcesso === '' || this.keyAcesso === null) {
        this.showAlert('Aviso', 'O campo chave do exame deve ser preenchido!');
      } else {
        for (const exame of this.qstData.examesArray) {
          console.log(exame.key);
          if (this.keyAcesso === exame.key) {
            this.flag = true;
            break;
          }
          this.ID++;
        }

        if (this.flag) {
          this.resetValues();
          this.router.navigate(['fazer-exame', this.ID]);
        } else {
          this.keyAcesso = '';
          this.showAlert('Aviso', 'A chave está incorreta. Tente novamente!');
        }
      }
    } else {
      if (this.username === '') {
        this.showAlert('Aviso', 'Por favor, informe o seu username!');
      } else if (this.password === '') {
        this.showAlert('Aviso', 'Por favor, informe a sua senha!');
      } else {
        if (this.username === 'aluno' && this.password === '1234') {
          this.resetValues();
          this.router.navigate(['fazer-exame', this.ID]);
        } else {
          this.username = '';
          this.password = '';
          this.showAlert('Aviso', 'Usuário incorreto, tente novamente!');
        }
      }
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

    this.qstData.examesArray.push(exame);
    console.log(this.qstData.examesArray);
  }


}
