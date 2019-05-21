import { Component, OnInit } from '@angular/core';
import { QuestaoCustom } from '../questao';
import { QuestaoPage } from '../questao/questao.page';

@Component({
  selector: 'app-atualizar-questao',
  // templateUrl: './atualizar-questao.page.html',
  templateUrl: '../questao/questao.page.html',
  styleUrls: ['./atualizar-questao.page.scss'],
})
export class AtualizarQuestaoPage extends QuestaoPage implements OnInit {

  private qst: QuestaoCustom;

  ngOnInit() {
    this.configService.getInitConfig().subscribe(data => this.config = data);

    this.title = 'Atualizar Questão';
    this.lQuestionText = 'Texto da questão:';
    this.lCategoriaText = 'Categoria:';
    this.createPage = false;
    this.lTextoLivreText = 'Texto da resposta:';
    this.buttonText = 'Atualizar';

    this.qst = this.qstDataService.data;
    this.textoQuestao = this.qst.textoQst;
    this.categoria = this.qst.categoria;

    if (this.qst.opcEscolha === 'unica') {
      this.opcResposta = this.qst.opcEscolha;
      this.formRadio = this.qst.alternativas;
    } else if (this.qst.opcEscolha === 'multipla') {
      this.opcResposta = this.qst.opcEscolha;
      this.formCheck = this.qst.alternativas;
    } else if (this.qst.opcEscolha === 'texto') {
      this.opcResposta = this.qst.opcEscolha;
      this.textoLivre = this.qst.textoLivre;
    }
  }

  ionViewDidEnter() {
    this.level = this.config.level;
    if (this.level) {
      this.nivel = this.qst.nivelDificuldade;
    }
  }

  actionQuestion() {
    if (this.textoQuestao === null || this.textoQuestao === '') {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de questão válido.');
    } else if (this.categoria === null || this.categoria === '') {
      this.showAlert('Aviso!', 'Por favor, forneça uma categoria de resposta válida.');
    } else if (this.opcResposta === 'texto' && (this.textoLivre === null || this.textoLivre === '')) {
      this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
    } else {


      this.qst.textoQst = this.textoQuestao;
      this.qst.categoria = this.categoria;
      if (this.level) {
        this.qst.nivelDificuldade = this.nivel;
      }
      if (this.opcResposta === 'unica') {
        this.qst.alternativas = this.formRadio;
        this.qst.textoLivre = null;
      } else if (this.opcResposta === 'texto') {
        if (this.textoLivre === null || this.textoLivre === '') {
          this.showAlert('Aviso!', 'Por favor, forneça um texto de resposta válida.');
        }
        this.qst.alternativas = null;
        this.qst.textoLivre = this.textoLivre;
      } else if (this.opcResposta === 'multipla') {
        this.qst.alternativas = this.formCheck;
        this.qst.textoLivre = null;
      }

      for (let k in this.qstDataService.itens) {
        if (this.qstDataService.itens[k].id === this.qst.id) {
          this.qstDataService.itens[k] = this.qst;
        }
      }

      console.log(this.qstDataService.itens);
      this.showAlert('Update', 'Questão atualizada com sucesso!');
      this.router.navigate(['tabs/pesquisar-questao']);
    }
  }

}
