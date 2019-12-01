import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CadastrarPrestadorComponent } from './cadastrar-prestador/cadastrar-prestador.component';
import { EditarPrestadorComponent } from './editar-prestador/editar-prestador.component';
import { CadastrarContratanteComponent } from './cadastrar-contratante/cadastrar-contratante.component';
import { EditarContratanteComponent } from './editar-contratante/editar-contratante.component';
import { PerfilPrestadorComponent } from './perfil-prestador/perfil-prestador.component';
import { PerfilContratanteComponent } from './perfil-contratante/perfil-contratante.component';
import { AnimaisComponent } from './animais/animais.component';
import { EditarAnimalComponent } from './editar-animal/editar-animal.component';
import { RemoverAnimalComponent } from './remover-animal/remover-animal.component';
import { AdicionarAnimalComponent } from './adicionar-animal/adicionar-animal.component';
import { SolicitarServicoComponent } from './solicitar-servico/solicitar-servico.component';
import { VerPrestadorComponent } from './ver-prestador/ver-prestador.component';
import { VerSolicitacoesComponent } from './ver-solicitacoes/ver-solicitacoes.component';
import { ConfirmarSolicitarServicoComponent } from './confirmar-solicitar-servico/confirmar-solicitar-servico.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar-prestador', component: CadastrarPrestadorComponent },
  { path: 'perfil-prestador/:id', component: PerfilPrestadorComponent,
    children: [
      { path: 'editar-prestador', component: EditarPrestadorComponent }
    ]
  },
  { path: 'cadastrar-contratante', component: CadastrarContratanteComponent },
  { path: 'perfil-contratante/:id', component: PerfilContratanteComponent,
    children: [
      { path: 'editar-contratante', component: EditarContratanteComponent }
    ]
  },
  { path: 'animais', component: AnimaisComponent,
    children: [
      { path: ':id/editar', component: EditarAnimalComponent },
      { path: ':id/remover', component: RemoverAnimalComponent },
    ]
  },
  { path: 'adicionar-animal', component: AdicionarAnimalComponent },
  { path: 'solicitar-servico', component: SolicitarServicoComponent,
    children: [
      { path: ':id/perfil', component: VerPrestadorComponent },
      { path: ':id/confirmar', component: ConfirmarSolicitarServicoComponent },
    ]
  },
  { path: 'ver-solicitacoes', component: VerSolicitacoesComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
