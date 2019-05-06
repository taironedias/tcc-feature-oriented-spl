import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CriarQuestaoPage } from './criar-questao.page';

const routes: Routes = [
  {
    path: '',
    component: CriarQuestaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CriarQuestaoPage]
})
export class CriarQuestaoPageModule {}
