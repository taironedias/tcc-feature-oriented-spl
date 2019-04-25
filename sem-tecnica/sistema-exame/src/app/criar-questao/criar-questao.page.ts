import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-questao',
  templateUrl: './criar-questao.page.html',
  styleUrls: ['./criar-questao.page.scss'],
})
export class CriarQuestaoPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.router.navigate(['home']);
  }

}
