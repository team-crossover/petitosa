import { Component, OnInit } from '@angular/core';
import { NovoPrestador, Endereco } from '../_models';
import { PrestadorService, EnderecoService } from '../_services';
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
    public toastr: ToastrService
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
  }

  fillArrayNumber(array: number[]) {
    for (let i = 0; i < this.SIZE_ARRAY; i++) {
      array[i] = 0;
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

}
