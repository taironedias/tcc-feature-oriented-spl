import { Component, OnInit } from '@angular/core';
import { QuestaoCustom } from '../questao';
import { QuestaoPage } from '../questao/questao.page';

@Component({
  selector: 'app-criar-questao',
  templateUrl: '../questao/questao.page.html',
  styleUrls: ['./criar-questao.page.scss'],
})
export class CriarQuestaoPage extends QuestaoPage implements OnInit {

  ngOnInit() {
    this.configService.getInitConfig().subscribe(data => this.config = data);
    this.title = 'Criar Questão';
    this.lQuestionText = 'Escreva o texto da questão:';
    this.lCategoriaText = 'Escolha a categoria:';
    this.createPage = true;
    this.lTextoLivreText = 'Escreva o que seria uma resposta adequada:';
    this.buttonText = 'Criar';
  }

  ionViewDidEnter() {
    this.level = this.config.level;
    this.valuesDefault();
  }

  actionQuestion() {

    if (this.textoQuestao === null || this.textoQuestao === '') {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de questão válido.');
    } else if (this.categoria === null || this.categoria === '') {
      this.showAlert('Aviso!', 'Por favor, forneça uma categoria de resposta válida.');
    } else if (this.opcResposta === 'texto' && (this.textoLivre === null || this.textoLivre === '')) {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
    } else {

      const qst = new QuestaoCustom();
      qst.textoQst = this.textoQuestao;
      qst.categoria = this.categoria;
      if (this.level) {
        qst.nivelDificuldade = this.nivel;
      }
      if (this.opcResposta === 'unica') {
        qst.alternativas = this.formRadio;
        qst.opcEscolha = this.opcResposta;
        qst.textoLivre = null;
      } else if (this.opcResposta === 'texto') {
        if (this.textoLivre === null || this.textoLivre === '') {
          this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
        }
        qst.alternativas = null;
        qst.opcEscolha = this.opcResposta;
        qst.textoLivre = this.textoLivre;
      } else if (this.opcResposta === 'multipla') {
        qst.alternativas = this.formCheck;
        qst.opcEscolha = this.opcResposta;
        qst.textoLivre = null;
      }

      console.log(qst);
      qst.id = this.gerarID();
      this.qstDataService.itens.push(qst);
      this.showAlert('Questão', 'Questão adicionada com sucesso!');
      this.resetCampos();
    }
  }

  resetCampos() {
    this.categoria = 'Any';
    this.nivel = '-1';
    this.textoQuestao = null;
    this.opcResposta = null;
    this.altRadio = null;
    this.formRadio = [
      { val: 'Alternativa 1', isChecked: false },
      { val: 'Alternativa 2', isChecked: false },
      { val: 'Alternativa 3', isChecked: false }
    ];
    this.cont = 0;
    this.disabledButton = false;
    this.formCheck = [
      { val: 'Alternativa 1', isChecked: false },
      { val: 'Alternativa 2', isChecked: false },
      { val: 'Alternativa 3', isChecked: false }
    ];
    this.altCheck = null;
    this.textoLivre = null;
  }

  addAlternativa() {
    this.formRadio[this.cont].val = this.altRadio;
    this.cont += 1;
    this.altRadio = '';
    if (this.cont === 3) {
      this.disabledButton = true;
    }
  }

  addCheckbox() {
    this.formCheck[this.cont].val = this.altCheck;
    this.cont += 1;
    this.altCheck = '';
    if (this.cont === 3) {
      this.disabledButton = true;
    }
  }

  gerarID(): string {
    let outString = '';
    const inOptions = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 3; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
  }

}
