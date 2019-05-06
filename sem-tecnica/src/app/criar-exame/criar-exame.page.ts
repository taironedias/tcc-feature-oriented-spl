import { Component, OnInit } from '@angular/core';
import { QuestionDataService } from '../services/question-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-exame',
  templateUrl: './criar-exame.page.html',
  styleUrls: ['./criar-exame.page.scss'],
})
export class CriarExamePage implements OnInit {

  examesArray;

  constructor(private router: Router,
              private qstData: QuestionDataService) { }

  ngOnInit() {
    this.examesArray = this.qstData.examesArray;
  }

  criarExame() {
    this.router.navigate(['selecionar-questao']);
  }

  goDetalhes(index) {
    this.router.navigate(['detalhes-exame', index]);
  }

}
