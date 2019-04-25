import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            { path: 'criar-questao', loadChildren: '../criar-questao/criar-questao.module#CriarQuestaoPageModule' },
            { path: 'pesquisar-questao', loadChildren: '../pesquisar-questao/pesquisar-questao.module#PesquisarQuestaoPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TabsRoutingModule { }
