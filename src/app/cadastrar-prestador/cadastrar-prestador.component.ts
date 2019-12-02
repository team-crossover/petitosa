import { Component, OnInit } from '@angular/core';
import { NovoPrestador, Endereco } from '../_models';
import { PrestadorService, EnderecoService, MoneyService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-prestador',
  templateUrl: './cadastrar-prestador.component.html',
  styleUrls: ['./cadastrar-prestador.component.css']
})
export class CadastrarPrestadorComponent implements OnInit {

  SIZE_ARRAY = 15;

  novoPrestador: NovoPrestador = new NovoPrestador();
  endereco: Endereco = new Endereco();
  error: any;
  servicosPrestados: boolean[] = [];
  precos: number[] = []; 

  constructor(
    public prestadorService: PrestadorService,
    public enderecoService: EnderecoService,
    public router: Router,
    public toastr: ToastrService,
    private money: MoneyService
  ) { }

  ngOnInit() {
    this.fillArrayBoolean(this.servicosPrestados);
    this.fillArrayNumber(this.precos);
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

  verifyAccount() {
    console.log(this.novoPrestador.contaBancaria);
    console.log(this.novoPrestador.contaBancaria.tipo);
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

  onSubmit() {
    this.novoPrestador.servicosPrestados = this.servicosPrestados;
    this.novoPrestador.precos = this.precos;
    this.novoPrestador.endereco.logradouro = this.endereco.logradouro;
    this.dateFormat();
    console.log(this.novoPrestador);
    this.prestadorService.createPrestador(this.novoPrestador)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.toastr.success('Prestador de serviços cadastrado com sucesso');
            this.router.navigate(["/login"]);
          }
        }, 
        error => {
          console.log(error);
          this.toastr.error(error.error.error);
        }
      );
  }

  fillArrayBoolean(array: boolean[]) {
    for (let i = 0; i < this.SIZE_ARRAY; i++) {
      array[i] = false;
    }
    for (let i = 0; i < 3; i++) {
      array[i] = true;
    }
  }

  fillArrayNumber(array: number[]) {
    for (let i = 0; i < this.SIZE_ARRAY; i++) {
      array[i] = 0;
    }

    for (let i = 0; i < 3; i++) {
      array[i] = 15.99;
    }
  }

  dateFormat(){
    var data = this.novoPrestador.dataNascimento;
    var splitted = data.split("-");
    var dia = splitted[2];
    var mes = splitted[1];
    var ano = splitted[0];
    this.novoPrestador.dataNascimento = dia + "/" + mes + "/" + ano;
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
