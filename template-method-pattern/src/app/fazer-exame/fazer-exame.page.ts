import { Component, OnInit } from '@angular/core';
import { QuestionDataService } from '../services/question-data.service';
import { ExameCustom } from '../exame';
import { QuestaoCustom } from '../questao';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fazer-exame',
  templateUrl: './fazer-exame.page.html',
  styleUrls: ['./fazer-exame.page.scss'],
})
export class FazerExamePage implements OnInit {

  disabledButton = false;
  nameButton = 'Próximo';
  exame = new ExameCustom();
  qst = new QuestaoCustom();
  cont: number;
  success = false;
  pontuacao = 0;
  textoLivreStudant = '';
  respCheckbox = [false, false, false];

  constructor(private alertCtrl: AlertController,
              private router: Router,
              private route: ActivatedRoute,
              private qstData: QuestionDataService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Recebido ID = ' + id);
    this.cont = 0;
    this.exame = this.qstData.examesArray[id];
    this.qst = this.exame.questoes[this.cont];
    console.log(this.qst);
  }

  setRespAlternativa(value) {
    if (this.qst.alternativas[value].isChecked) {
      console.log('Congratulations!');
      this.success = true;
    }
  }

  ionViewWillEnter() {
    if (this.cont < this.exame.questoes.length) {
      if (this.cont === this.exame.questoes.length - 1) {
        this.nameButton = 'Finalizar';
      }
      this.success = false;
      this.qst = this.exame.questoes[this.cont];
    } else {
      // Desabilitar o botão ou voltar para a home principal!
      this.disabledButton = true;
      this.showAlert('Pontuação Final', 'Você obteve ' + this.pontuacao + ' pontos de ' + this.cont + ' questões!');
    }
  }
  async next() {
    this.cont++;

    if (this.qst.opcEscolha === 'unica') {
      if (this.success) {
        this.pontuacao++;
      }
    } else if (this.qst.opcEscolha === 'multipla') {
      this.success = true;
      for (const i in this.respCheckbox) {
        if (this.respCheckbox[i] !== this.qst.alternativas[i].isChecked) {
          this.success = false;
        }
      }

      if (this.success) {
        this.pontuacao++;
      }
    } else if (this.qst.opcEscolha === 'texto') {

      if (this.textoLivreStudant.toLowerCase() === this.qst.textoLivre.toLowerCase()) {
        this.success = true;
        this.pontuacao++;
      } else if (this.textoLivreStudant.toLowerCase().includes(this.qst.textoLivre.toLowerCase())) {
        this.pontuacao += 0.5;
      }

    }

    this.ionViewWillEnter();
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
