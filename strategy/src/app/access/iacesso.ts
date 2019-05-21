import { QuestionDataService } from '../services/question-data.service';

export interface IAcessoStrategy {
    title: string;
    labelText1: string;
    labelText2: string;
    label1: string;
    label2: string;
    typeLabel2: string;
    buttonText: string;
    callback: string;

    makeAction(qstData: QuestionDataService): any[];
}
