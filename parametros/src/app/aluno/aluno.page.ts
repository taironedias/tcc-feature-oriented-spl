import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestaoCustom } from '../questao';
import { ExameCustom } from '../exame';
import { QuestionDataService } from '../services/question-data.service';
import { AlertController } from '@ionic/angular';

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

  constructor(private qstData: QuestionDataService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.valuesDefault();
  }

  makeExame() {
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
        this.router.navigate(['fazer-exame', this.ID]);
      } else {
        this.keyAcesso = '';
        this.showAlert('Aviso', 'A chave está incorreta. Tente novamente!');
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

    let exame = new ExameCustom();
    exame.nameExame = 'Default System';

    // this.qstData.itens.push(qst);
    // this.qstData.itens.push(qst2);
    // this.qstData.itens.push(qst3);
    exame.questoes.push(qst);
    exame.questoes.push(qst2);
    exame.questoes.push(qst3);
    exame.key = 'keyexame';

    this.qstData.examesArray.push(exame);
    console.log(this.qstData.examesArray);
  }


}
