import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CriarQuestaoPage } from './criar-questao.page';
import { NivelComponent } from '../nivel/nivel.component';

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
  declarations: [CriarQuestaoPage, NivelComponent]
})
export class CriarQuestaoPageModule {}
