import { QuestaoCustom } from '../questao';

export interface IQuestion {
    title: string;
    lQuestionText: string;
    textoQuestao: string;
    lCategoriaText: string;
    categoria: string;
    categorias: string[];
    createPage: boolean;
    opcResposta: string;
    altRadio: string;
    disabledButton: boolean;
    formRadio;
    altCheck: string;
    formCheck;
    lTextoLivreText: string;
    textoLivre: string;
    level: boolean;
    nivel: string;
    niveis: string[];
    buttonText: string;

    cont: number;

    actionQuestion(): void;
}
