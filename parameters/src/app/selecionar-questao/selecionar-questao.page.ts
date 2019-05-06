import { Component, OnInit, Inject } from '@angular/core';
import { QuestionDataService } from '../services/question-data.service';
import { Router } from '@angular/router';
import { ExameCustom } from '../exame';
import { AlertController } from '@ionic/angular';
import { ConfigService, LEVEL_BASE } from '../services/config';
import { QuestaoCustom } from '../questao';

@Component({
  selector: 'app-selecionar-questao',
  templateUrl: './selecionar-questao.page.html',
  styleUrls: ['./selecionar-questao.page.scss'],
})
export class SelecionarQuestaoPage implements OnInit {

  level: boolean;

  nameExame = '';
  qstItens = [];

  constructor(private qstData: QuestionDataService,
              private router: Router,
              private alertCtrl: AlertController,
              private configService: ConfigService,
              @Inject(LEVEL_BASE) levelBase: string) {
    this.level = levelBase === 'true' ? true : false;
  }

  ngOnInit() {
    if (this.level) {
      for (let i = 1; i <= 3; i++) {
        for (const qts of this.qstData.itens) {
          if (qts.nivelDificuldade === i.toString()) {
            this.qstItens.push({
              value: qts.textoQst,
              isChecked: false
            });
          }
        }
      }
    } else {
      for (const qts of this.qstData.itens) {
        this.qstItens.push({
          value: qts.textoQst,
          isChecked: false
        });
      }
    }

  }

  sortLevel(questions: QuestaoCustom[]): QuestaoCustom[] {

    questions.sort();
    console.log(questions);
    return questions;
  }

  addQuestions() {
    let exame = new ExameCustom();
    exame.nameExame = this.nameExame;
    let i = 0;
    for (const item of this.qstItens) {
      // console.log(item.value + '-->' + item.isChecked);
      if (item.isChecked) {
        exame.questoes.push(this.qstData.itens[i]);
      }
      i++;
    }
    exame.key = this.gerarKey();
    this.qstData.examesArray.push(exame);
    console.log(this.qstData.examesArray);
    this.showAlert('Criar Exame!', 'O exame ' + exame.nameExame + ' foi criado com sucesso! A chave de acesso é: ' + exame.key);
    this.router.navigate(['tabs/criar-exame']);
  }

  gerarKey(): string {
    let outString = '';
    const inOptions = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 32; i++) {
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
}
