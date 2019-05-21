import { Injectable } from '@angular/core';
import { IAcessoStrategy } from '../access/iacesso';
import { QuestionDataService } from '../services/question-data.service';

@Injectable()
export class LoginTeacherService implements IAcessoStrategy {

    title = 'Login Professor';
    labelText1 = 'Username';
    labelText2 = 'Password';
    typeLabel2 = 'password';
    buttonText = 'Acessar';
    label1: string;
    label2: string;
    callback: string;

    makeAction(qstData: QuestionDataService): any[] {
        if (this.label1 === '') {
            this.callback = 'Por favor, informe o seu username!';
        } else if (this.label2 === '') {
            this.callback = 'Por favor, informe o sua senha!';
        } else {
            if (this.label1 === 'admin' && this.label2 === 'qwe123') {
                return ['tabs'];
            } else {
                this.callback = 'Usuário incorreto, tente novamente!';
            }
        }
        return [];
    }


}