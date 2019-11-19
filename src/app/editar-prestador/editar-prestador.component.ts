import { Component, OnInit } from '@angular/core';
import { NovoPrestador, Prestador } from '../_models';
import { PrestadorService, AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PerfilPrestadorComponent } from '../perfil-prestador/perfil-prestador.component'; 

@Component({
  selector: 'app-editar-prestador',
  templateUrl: './editar-prestador.component.html',
  styleUrls: ['./editar-prestador.component.css']
})
export class EditarPrestadorComponent implements OnInit {

  prestador: Prestador;
  novoPrestador: NovoPrestador = new NovoPrestador();
  error: any;
  servicosPrestados: boolean[] = [];
  precos: number[] = []; 

  idPrestador: number;

  constructor(
    public prestadorService: PrestadorService,
    public auth: AuthenticationService,
    public router: Router,
    public toastr: ToastrService,
    private perfilPrestador: PerfilPrestadorComponent
  ) { }

  ngOnInit() {
    this.idPrestador = this.perfilPrestador.idPrestador;
    this.patchNovoPrestador();
  }

  patchNovoPrestador() {
    this.prestadorService.getPrestador(this.idPrestador).subscribe(data => {
      this.prestador = data;
      //this.novoPrestador.dataNascimento = this.prestador.dataNascimento;
      this.dateFormatToSee();
      this.novoPrestador.descricao = this.prestador.descricao;
      this.novoPrestador.email = this.prestador.email;
      this.novoPrestador.endereco.cep = this.prestador.endereco.cep;
      this.novoPrestador.endereco.logradouro = this.prestador.endereco.logradouro;
      this.novoPrestador.genero = this.prestador.genero;
      this.novoPrestador.nome = this.prestador.nome;
      this.precos = this.prestador.precos;
      this.servicosPrestados = this.prestador.servicosPrestados;
    });
  }

  onSubmit() {
    this.novoPrestador.servicosPrestados = this.servicosPrestados;
    this.novoPrestador.precos = this.precos;
    this.dateFormatToSave();
    this.prestadorService.updatePrestador(this.idPrestador, this.novoPrestador)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.toastr.success('Prestador de serviços atualizado com sucesso');
            this.auth.logout();
            this.router.navigate(["/login"]);
          }
        }, 
        error => {
          this.toastr.error(error.error);
        }
      );
  }

  dateFormatToSave(){
    //yyyy-mm-dd to dd/mm/yyyy
    var data = this.novoPrestador.dataNascimento;
    var splitted = data.split("-");
    var dia = splitted[2];
    var mes = splitted[1];
    var ano = splitted[0];
    this.novoPrestador.dataNascimento = dia + "/" + mes + "/" + ano;
  }

  dateFormatToSee(){
    //dd/mm/yyyy to yyyy-mm-dd
    var data = this.prestador.dataNascimento;
    var splitted = data.split("/");
    var dia = splitted[0];
    var mes = splitted[1];
    var ano = splitted[2];
    this.novoPrestador.dataNascimento = ano + "-" + mes + "-" + dia;
  }

}
