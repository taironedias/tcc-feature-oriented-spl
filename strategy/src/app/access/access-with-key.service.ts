import { Injectable } from '@angular/core';
import { IAcessoStrategy } from './iacesso';
import { QuestionDataService } from '../services/question-data.service';

@Injectable()
export class AccessWithKeyService implements IAcessoStrategy {

    title = 'Aluno';
    labelText1 = 'Digite seu nome:';
    labelText2 = 'Digite a chave de acesso:';
    typeLabel2 = 'text';
    label1: string;
    label2: string;
    buttonText = 'Fazer exame';
    callback: string;
    ID = 0;
    flag = false;

    makeAction(qstData: QuestionDataService): any[] {
        if (this.label1 === '' || this.label1 === null) {
            this.callback = 'O campo nome do aluno deve ser preenchido!';
        } else if (this.label2 === '' || this.label2 === null) {
            this.callback = 'O campo chave do exame deve ser preenchido!';
        } else {
            for (const exame of qstData.examesArray) {
                if (this.label2 === exame.key) {
                    this.flag = true;
                    break;
                }
                this.ID++;
            }

            if (this.flag) {
                return ['fazer-exame', this.ID];
            } else {
                this.label2 = '';
                this.callback = 'A chave está incorreta. Tente novamente!';
            }
        }
        return [];
    }

}
