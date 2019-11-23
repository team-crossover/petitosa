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
    SolicitarServicoComponent
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
