import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'atualizar-questao', loadChildren: './atualizar-questao/atualizar-questao.module#AtualizarQuestaoPageModule' },
  { path: 'selecionar-questao', loadChildren: './selecionar-questao/selecionar-questao.module#SelecionarQuestaoPageModule' },
  { path: 'detalhes-exame/:id', loadChildren: './detalhes-exame/detalhes-exame.module#DetalhesExamePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
