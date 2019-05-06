import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionDataService } from '../services/question-data.service';
import { QuestaoCustom } from '../questao';
import { ExameCustom } from '../exame';

@Component({
  selector: 'app-detalhes-exame',
  templateUrl: './detalhes-exame.page.html',
  styleUrls: ['./detalhes-exame.page.scss'],
})
export class DetalhesExamePage implements OnInit {

  exame: ExameCustom;
  questoes: Array<QuestaoCustom> = [];
  id: string;

  constructor(private qstData: QuestionDataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Recebido ID = ' + this.id);

    for(let i in this.qstData.examesArray) {
      if (i === this.id) {
        this.exame = this.qstData.examesArray[i];
      }
    }

    this.questoes = this.exame.questoes;
    console.log(this.exame);
  }

}
