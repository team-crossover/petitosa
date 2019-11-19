import { Component, OnInit } from '@angular/core';
import { NovoContratante, Contratante, Endereco } from '../_models';
import { ContratanteService, AuthenticationService, EnderecoService } from '../_services';
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
  endereco: Endereco = new Endereco();
  novoContratante: NovoContratante = new NovoContratante();
  error: any;
  servicosPrestados: boolean[] = [];
  precos: number[] = []; 

  idContratante: number;

  constructor(
    public contratanteService: ContratanteService,
    public enderecoService: EnderecoService,
    public auth: AuthenticationService,
    public router: Router,
    public toastr: ToastrService,
    private perfilContratante: PerfilContratanteComponent
  ) { }

  ngOnInit() {
    this.idContratante = this.perfilContratante.idContratante;
    this.patchNovoContratante();
  }

  patchNovoContratante() {
    this.contratanteService.getContratante(this.idContratante).subscribe(data => {
      this.contratante = data;
      this.dateFormatToSee();
      this.novoContratante.email = this.contratante.email;
      this.novoContratante.endereco.cep = this.contratante.endereco.cep;
      this.endereco.logradouro = this.contratante.endereco.logradouro;
      this.endereco.bairro = this.contratante.endereco.bairro;
      this.endereco.cidade = this.contratante.endereco.cidade;
      this.endereco.uf = this.contratante.endereco.uf;
      this.novoContratante.genero = this.contratante.genero;
      this.novoContratante.nome = this.contratante.nome;

    });
  }

  onSubmit() {
    this.novoContratante.endereco.logradouro = this.endereco.logradouro;
    this.dateFormatToSave();
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
          this.toastr.error(error.error);
        }
      );
  }

  verifyCep() {
    if (this.novoContratante.endereco.cep != null) {
      this.enderecoService.getEndereco(this.novoContratante.endereco.cep).subscribe(data => {
        this.endereco = data;
        console.log(this.endereco);
      })
    }
  }

  dateFormatToSave(){
    //yyyy-mm-dd to dd/mm/yyyy
    var data = this.novoContratante.dataNascimento;
    var splitted = data.split("-");
    var dia = splitted[2];
    var mes = splitted[1];
    var ano = splitted[0];
    this.novoContratante.dataNascimento = dia + "/" + mes + "/" + ano;
  }

  dateFormatToSee(){
    //dd/mm/yyyy to yyyy-mm-dd
    var data = this.contratante.dataNascimento;
    var splitted = data.split("/");
    var dia = splitted[0];
    var mes = splitted[1];
    var ano = splitted[2];
    this.novoContratante.dataNascimento = ano + "-" + mes + "-" + dia;
  }
}
