import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PesquisarQuestaoPage } from './pesquisar-questao.page';

const routes: Routes = [
  {
    path: '',
    component: PesquisarQuestaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PesquisarQuestaoPage]
})
export class PesquisarQuestaoPageModule {}
