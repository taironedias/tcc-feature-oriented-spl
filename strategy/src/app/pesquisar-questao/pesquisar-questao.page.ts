import { Component, OnInit } from '@angular/core';
import { QuestionDataService } from '../services/question-data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisar-questao',
  templateUrl: './pesquisar-questao.page.html',
  styleUrls: ['./pesquisar-questao.page.scss'],
})
export class PesquisarQuestaoPage implements OnInit {

  public searchTerm = '';
  public questions: any;

  constructor(private qstDataService: QuestionDataService,
              private router: Router) { }

  ngOnInit() {
    this.setFiltroQst();
  }

  setFiltroQst() {
    this.questions = this.qstDataService.filtroItens(this.searchTerm);
  }

  goDetalhes(question) {
    this.qstDataService.data = question;
    this.router.navigate(['question-update']);
  }

}
