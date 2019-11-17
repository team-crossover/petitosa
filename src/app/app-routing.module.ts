import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CadastrarPrestadorComponent } from './cadastrar-prestador/cadastrar-prestador.component';
import { EditarPrestadorComponent } from './editar-prestador/editar-prestador.component';
import { CadastrarContratanteComponent } from './cadastrar-contratante/cadastrar-contratante.component';
import { EditarContratanteComponent } from './editar-contratante/editar-contratante.component';
import { PerfilPrestadorComponent } from './perfil-prestador/perfil-prestador.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar-prestador', component: CadastrarPrestadorComponent },
  { path: 'perfil-prestador/:id', component: PerfilPrestadorComponent,
    children: [
      { path: 'editar-prestador', component: EditarPrestadorComponent }
    ]
  },
  { path: 'cadastrar-contratante', component: CadastrarContratanteComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
