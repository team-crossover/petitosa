import { Component, OnInit } from '@angular/core';
import { NovoPrestador, Prestador, Endereco } from '../_models';
import { PrestadorService, AuthenticationService, EnderecoService, MoneyService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PerfilPrestadorComponent } from '../perfil-prestador/perfil-prestador.component'; 
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-editar-prestador',
  templateUrl: './editar-prestador.component.html',
  styleUrls: ['./editar-prestador.component.css']
})
export class EditarPrestadorComponent implements OnInit {

  prestador: Prestador;
  endereco: Endereco = new Endereco();
  novoPrestador: NovoPrestador = new NovoPrestador();
  error: any;
  servicosPrestados: boolean[] = [];
  precos: number[] = []; 

  idPrestador: number;

  constructor(
    public prestadorService: PrestadorService,
    public enderecoService: EnderecoService,
    public auth: AuthenticationService,
    public router: Router,
    public toastr: ToastrService,
    private perfilPrestador: PerfilPrestadorComponent,
    private money: MoneyService,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.idPrestador = this.perfilPrestador.idPrestador;
    this.patchNovoPrestador();
  }

  patchNovoPrestador() {
    this.prestadorService.getPrestador(this.idPrestador).subscribe(data => {
      this.prestador = data;
      this.dateFormatToSee();
      this.novoPrestador.descricao = this.prestador.descricao;
      this.novoPrestador.email = this.prestador.email;
      this.novoPrestador.endereco.cep = this.prestador.endereco.cep;
      this.endereco.logradouro = this.prestador.endereco.logradouro;
      this.endereco.bairro = this.prestador.endereco.bairro;
      this.endereco.cidade = this.prestador.endereco.cidade;
      this.endereco.uf = this.prestador.endereco.uf;
      this.novoPrestador.genero = this.prestador.genero;
      this.novoPrestador.nome = this.prestador.nome;
      this.precos = this.prestador.precos;
      this.servicosPrestados = this.prestador.servicosPrestados;
      this.novoPrestador.contaBancaria.agencia = this.prestador.contaBancaria.agencia;
      this.novoPrestador.contaBancaria.digito = this.prestador.contaBancaria.digito;
      this.novoPrestador.contaBancaria.numero = this.prestador.contaBancaria.numero;
      this.novoPrestador.contaBancaria.tipo = this.prestador.contaBancaria.tipo;

    });
  }

  onSubmit() {
    this.novoPrestador.servicosPrestados = this.servicosPrestados;
    this.novoPrestador.precos = this.precos;
    this.novoPrestador.endereco.logradouro = this.endereco.logradouro;
    this.dateFormatToSave();
    this.prestadorService.updatePrestador(this.idPrestador, this.novoPrestador)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.toastr.success('Prestador de serviços atualizado com sucesso');
            if (this.novoPrestador.senha) {
              this.auth.logout();
              this.router.navigate(["/login"]);
            } else {
              this.appComponent.loadUsername();
              this.router.navigate(["/perfil-prestador/" + this.idPrestador]);
            }
          }
        }, 
        error => {
          this.toastr.error(error.error);
        }
      );
  }

  verifyCep() {
    if (this.novoPrestador.endereco.cep != null) {
      this.enderecoService.getEndereco(this.novoPrestador.endereco.cep).subscribe(data => {
        this.endereco = data;
        console.log(this.endereco);
      }, error => {
        this.toastr.error('CEP inválido');
        this.endereco.bairro = '';
        this.endereco.cidade = '';
        this.endereco.latitude = 0;
        this.endereco.longitude = 0;
        this.endereco.logradouro = '';
        this.endereco.uf = '';
      })
    }
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

  verifyAccount() {
    if (this.novoPrestador.contaBancaria != null) {
      this.money.validateConta(this.novoPrestador.contaBancaria)
        .pipe(first())
        .subscribe(
          data => {
            this.toastr.success('Conta válida');
          }, error => {
            this.toastr.error('Conta inválida');
            console.log(error);
          }
        )
    } else {
      this.toastr.error('Preencha todos os campos antes de validar a conta');
    }
  }

  imgChangeListener(imageInput): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      if (event.target.result.length > 100000)
        this.toastr.error("A imagem deve ser menor que 100 kb");
      else
        this.novoPrestador.imgPerfil = event.target.result;
    });
    reader.readAsDataURL(file);
  }


}
