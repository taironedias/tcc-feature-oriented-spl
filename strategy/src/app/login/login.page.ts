import { Component, OnInit, Injector } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IAcessoStrategy } from '../access/iacesso';
import { AccessStrategyToken } from '../access/token';
import { QuestionDataService } from '../services/question-data.service';

@Component({
  selector: 'app-login',
  templateUrl: '../access/access.page.html',
  styleUrls: ['../access/access.page.scss'],
})
export class LoginPage implements OnInit {

  label1 = '';
  label2 = '';
  public chosenAccess: IAcessoStrategy;

  constructor(private alertCtrl: AlertController,
              private router: Router,
              private injector: Injector) { }

  ngOnInit() {
    this.chosenAccess = this.getServiceByName('LoginTeacherService');
    console.log(this.chosenAccess.title);
  }

  getServiceByName(nameService: string) {
    return this.injector.get(AccessStrategyToken).find(x => x.constructor.name === nameService);
  }

  loading() {
    this.chosenAccess.label1 = this.label1;
    this.chosenAccess.label2 = this.label2;
    const nav = this.chosenAccess.makeAction(new QuestionDataService());
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

}
