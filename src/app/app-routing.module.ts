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
import { RejeitarServicoComponent } from './rejeitar-servico/rejeitar-servico.component';
import { VerAnimalSolicitacaoComponent } from './ver-animal-solicitacao/ver-animal-solicitacao.component';
import { DesistirServicoComponent } from './desistir-servico/desistir-servico.component';
import { ServicoFinalizadoComponent } from './servico-finalizado/servico-finalizado.component';
import { AvaliarServicoComponent } from './avaliar-servico/avaliar-servico.component';
import { SolicitacoesContratanteComponent } from './solicitacoes-contratante/solicitacoes-contratante.component';
import { AuthGuard } from './_guards';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: {
      requiresGuest: true,
    }
  },
  { path: 'cadastrar-prestador', component: CadastrarPrestadorComponent, canActivate: [AuthGuard], data: {
      requiresGuest: true,
    }
  },
  { path: 'perfil-prestador/:id', component: PerfilPrestadorComponent, canActivate: [AuthGuard], data: {
      requiresRoles: ['prestador', 'contratante']
    },
    children: [
      { path: 'editar-prestador', component: EditarPrestadorComponent, canActivate: [AuthGuard], data: {
          requiresRoles: ['prestador'],
        }
      }
    ]
  },
  { path: 'cadastrar-contratante', component: CadastrarContratanteComponent, canActivate: [AuthGuard], data: {
      requiresGuest: true,
    }
  },
  { path: 'perfil-contratante/:id', component: PerfilContratanteComponent, canActivate: [AuthGuard], data: {
      requiresRoles: ['contratante', 'prestador']
    },
    children: [
      { path: 'editar-contratante', component: EditarContratanteComponent, canActivate: [AuthGuard], data: {
          requiresRoles: ['contratante'],
        }
     }
    ]
  },
  { path: 'animais', component: AnimaisComponent, canActivate: [AuthGuard], data: {
      requiresRoles: ['contratante'],
    },
    children: [
      { path: ':id/editar', component: EditarAnimalComponent, canActivate: [AuthGuard], data: {
          requiresRoles: ['contratante'],
        }
      },
      { path: ':id/remover', component: RemoverAnimalComponent, canActivate: [AuthGuard], data: {
          requiresRoles: ['contratante'],
        }
      },
    ]
  },
  { path: 'adicionar-animal', component: AdicionarAnimalComponent, canActivate: [AuthGuard], data: {
      requiresRoles: ['contratante']
    }
  },
  { path: 'solicitar-servico', component: SolicitarServicoComponent, canActivate: [AuthGuard], data: {
      requiresRoles: ['contratante']
    },
    children: [
      { path: ':id/perfil', component: VerPrestadorComponent, canActivate: [AuthGuard], data: {
          requiresRoles: ['contratante']
        }
      },
      { path: ':id/confirmar', component: ConfirmarSolicitarServicoComponent, canActivate: [AuthGuard], data: {
          requiresRoles: ['contratante']
        }
      }
    ]
  },
  { path: 'solicitacoes-contratante', component: SolicitacoesContratanteComponent, canActivate: [AuthGuard], data: {
      requiresRoles: ['contratante']
    }
  },
  { path: 'ver-solicitacoes', component: VerSolicitacoesComponent, canActivate: [AuthGuard], data: {
      requiresRoles: ['prestador']
    },
    children: [
      { path: ':id/rejeitar-servico', component: RejeitarServicoComponent, canActivate: [AuthGuard], data: {
          requiresRoles: ['prestador']
        }
      },
      { path: ':id/ver-animal', component: VerAnimalSolicitacaoComponent, canActivate: [AuthGuard], data: {
          requiresRoles: ['prestador']
        }
      },
      { path: ':id/desistir-servico', component: DesistirServicoComponent, canActivate: [AuthGuard], data: {
          requiresRoles: ['prestador']
        }
      },
      { path: ':id/servico-finalizado', component: ServicoFinalizadoComponent, canActivate: [AuthGuard], data: {
          requiresRoles: ['prestador']
        }
      }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
