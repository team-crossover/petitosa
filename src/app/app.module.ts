import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastrarPrestadorComponent } from './cadastrar-prestador/cadastrar-prestador.component';
import { CadastrarContratanteComponent } from './cadastrar-contratante/cadastrar-contratante.component';
import { EditarContratanteComponent } from './editar-contratante/editar-contratante.component';
import { EditarPrestadorComponent } from './editar-prestador/editar-prestador.component';
import { PerfilPrestadorComponent } from './perfil-prestador/perfil-prestador.component';
import { PerfilContratanteComponent } from './perfil-contratante/perfil-contratante.component';
import { AnimaisComponent } from './animais/animais.component';
import { EditarAnimalComponent } from './editar-animal/editar-animal.component';
import { RemoverAnimalComponent } from './remover-animal/remover-animal.component';
import { AdicionarAnimalComponent } from './adicionar-animal/adicionar-animal.component';
import { EspeciePipe } from './_pipes/especie.pipe';
import { TamanhoPipe } from './_pipes/tamanho.pipe';
import { SolicitarServicoComponent } from './solicitar-servico/solicitar-servico.component';
import { VerPrestadorComponent } from './ver-prestador/ver-prestador.component';
import { VerSolicitacoesComponent } from './ver-solicitacoes/ver-solicitacoes.component';
import { ConfirmarSolicitarServicoComponent } from './confirmar-solicitar-servico/confirmar-solicitar-servico.component';
import { RejeitarServicoComponent } from './rejeitar-servico/rejeitar-servico.component';
import { VerAnimalSolicitacaoComponent } from './ver-animal-solicitacao/ver-animal-solicitacao.component';
import { DataHoraPipe } from './_pipes/data-hora.pipe';
import { ServicoPipe } from './_pipes/servico.pipe';
import { DesistirServicoComponent } from './desistir-servico/desistir-servico.component';
import { ServicoFinalizadoComponent } from './servico-finalizado/servico-finalizado.component';
import { AvaliarServicoComponent } from './avaliar-servico/avaliar-servico.component';
import { SolicitacoesContratanteComponent } from './solicitacoes-contratante/solicitacoes-contratante.component';
import { DesistirSolicitacaoContratanteComponent } from './desistir-solicitacao-contratante/desistir-solicitacao-contratante.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastrarPrestadorComponent,
    CadastrarContratanteComponent,
    EditarContratanteComponent,
    EditarPrestadorComponent,
    PerfilPrestadorComponent,
    PerfilContratanteComponent,
    AnimaisComponent,
    EditarAnimalComponent,
    RemoverAnimalComponent,
    AdicionarAnimalComponent,
    EspeciePipe,
    TamanhoPipe,
    SolicitarServicoComponent,
    VerPrestadorComponent,
    VerSolicitacoesComponent,
    ConfirmarSolicitarServicoComponent,
    RejeitarServicoComponent,
    VerAnimalSolicitacaoComponent,
    DataHoraPipe,
    ServicoPipe,
    DesistirServicoComponent,
    ServicoFinalizadoComponent,
    AvaliarServicoComponent,
    SolicitacoesContratanteComponent,
    DesistirSolicitacaoContratanteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
