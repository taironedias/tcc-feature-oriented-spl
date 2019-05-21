import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AccessPage } from '../access/access.page';

@Component({
  selector: 'app-login',
  // templateUrl: './login.page.html',
  templateUrl: '../access/access.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends AccessPage implements OnInit {

  ngOnInit() {
    this.title = 'Login Professor';
    this.labelText1 = 'Username';
    this.labelText2 = 'Password';
    this.typeLabel2 = 'password';
    this.buttonText = 'Acessar';
  }

  letsGo() {
    if (this.label1 === '') {
      this.showAlert('Aviso', 'Por favor, informe o seu username!');
    } else if (this.label2 === '') {
      this.showAlert('Aviso', 'Por favor, informe o sua senha!');
    } else {
      if (this.label1 === 'admin' && this.label2 === 'qwe123') {
        this.router.navigate(['tabs']);
      } else {
        this.showAlert('Aviso', 'Usuário incorreto, tente novamente!');
      }
    }
  }

  resetValues() {
    this.label1 = '';
    this.label2 = '';
  }

}
