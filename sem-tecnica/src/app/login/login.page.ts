import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username = '';
  password = '';

  constructor(private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.username === '') {
      this.showAlert('Aviso', 'Por favor, informe o seu username!');
    } else if (this.password === '') {
      this.showAlert('Aviso', 'Por favor, informe o sua senha!');
    } else {
      if (this.username === 'admin' && this.password === 'qwe123') {
        this.router.navigate(['tabs']);
      } else {
        this.username = '';
        this.password = '';
        this.showAlert('Aviso', 'Usuário incorreto, tente novamente!');
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

}
