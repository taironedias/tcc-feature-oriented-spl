import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AtualizarQuestaoPage } from './atualizar-questao.page';

const routes: Routes = [
  {
    path: '',
    component: AtualizarQuestaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AtualizarQuestaoPage]
})
export class AtualizarQuestaoPageModule {}
