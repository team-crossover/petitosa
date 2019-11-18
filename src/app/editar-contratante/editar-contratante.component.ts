import { Component, OnInit } from '@angular/core';
import { NovoContratante, Contratante } from '../_models';
import { ContratanteService, AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PerfilContratanteComponent } from '../perfil-contratante/perfil-contratante.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-editar-contratante',
  templateUrl: './editar-contratante.component.html',
  styleUrls: ['./editar-contratante.component.css']
})
export class EditarContratanteComponent implements OnInit {

  contratante: Contratante;
  novoContratante: NovoContratante = new NovoContratante();
  error: any;
  servicosPrestados: boolean[] = [];
  precos: number[] = []; 

  idContratante: number;

  constructor(
    public contratanteService: ContratanteService,
    public auth: AuthenticationService,
    public router: Router,
    public toastr: ToastrService,
    private perfilContratante: PerfilContratanteComponent
  ) { }

  ngOnInit() {
    this.idContratante = this.perfilContratante.idContratante;
    this.patchNovoPrestador();
  }

  patchNovoPrestador() {
    this.contratanteService.getContratante(this.idContratante).subscribe(data => {
      this.contratante = data;
      this.novoContratante.dataNascimento = this.contratante.dataNascimento;
      this.novoContratante.email = this.contratante.email;
      this.novoContratante.endereco.cep = this.contratante.endereco.cep;
      this.novoContratante.endereco.logradouro = this.contratante.endereco.logradouro;
      this.novoContratante.genero = this.contratante.genero;
      this.novoContratante.nome = this.contratante.nome;
      
    });
  }

  onSubmit() {
    this.contratanteService.updateContratante(this.idContratante, this.novoContratante)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.toastr.success('Contratante atualizado com sucesso');
            this.auth.logout();
            this.router.navigate(["/login"]);
          }
        }, 
        error => {
          this.toastr.error(error.error.error);
        }
      );
  }

}
