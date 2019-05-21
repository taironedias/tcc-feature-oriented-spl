import { Injectable } from '@angular/core';
import { IAcessoStrategy } from './iacesso';
import { QuestionDataService } from '../services/question-data.service';

@Injectable()
export class AccessWithLoginService implements IAcessoStrategy {
    title = 'Aluno';
    labelText1 = 'Username:';
    labelText2 = 'Password:';
    typeLabel2 = 'password';
    label1: string;
    label2: string;
    buttonText = 'Login';
    callback: string;

    makeAction(qstData: QuestionDataService): any[] {
        if (this.label1 === '') {
            this.callback = 'Por favor, informe o seu username!';
        } else if (this.label2 === '') {
            this.callback = 'Por favor, informe o sua senha!';
        } else {
            if (this.label1 === 'aluno' && this.label2 === '1234') {
                return ['fazer-exame', 0];
            } else {
                this.callback = 'Usuário incorreto, tente novamente!';
            }
        }
        return [];
    }

}
