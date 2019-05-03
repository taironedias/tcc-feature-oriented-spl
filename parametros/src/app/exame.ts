import { QuestaoCustom } from './questao';

export class ExameCustom {
    nameExame: string;
    questoes: Array<QuestaoCustom> = [];
    key: string;
}