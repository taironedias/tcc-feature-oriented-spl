import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            { path: 'question-create', loadChildren: '../question-create/question-create.module#QuestionCreatePageModule' },
            { path: 'pesquisar-questao', loadChildren: '../pesquisar-questao/pesquisar-questao.module#PesquisarQuestaoPageModule' },
            { path: 'criar-exame', loadChildren: '../criar-exame/criar-exame.module#CriarExamePageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsRoutingModule { }
