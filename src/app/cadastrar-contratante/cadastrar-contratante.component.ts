import { Component, OnInit } from '@angular/core';
import { NovoContratante, Endereco } from '../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { ContratanteService, EnderecoService, MoneyService } from '../_services';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-contratante',
  templateUrl: './cadastrar-contratante.component.html',
  styleUrls: ['./cadastrar-contratante.component.css']
})
export class CadastrarContratanteComponent implements OnInit {

  novoContratante: NovoContratante = new NovoContratante();
  endereco: Endereco = new Endereco();
  error: string = null;

  constructor(
    public contratanteService: ContratanteService,
    public enderecoService: EnderecoService,
    public router: Router,
    public toastr: ToastrService,
    private money: MoneyService
  ) { }

  ngOnInit() { }

  verifyCep() {
    if (this.novoContratante.endereco.cep != null) {
      this.enderecoService.getEndereco(this.novoContratante.endereco.cep).subscribe(data => {
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
    this.novoContratante.endereco.logradouro = this.endereco.logradouro;
    this.dateFormat();
    console.log(this.novoContratante);
    this.contratanteService.createContratante(this.novoContratante)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.toastr.success('Contratante cadastrado com sucesso');
            this.router.navigate(["/login"]);
          }
        }, 
        error => {
          console.log(error);
          this.toastr.error(error.error.error);
        }
      );
  }

  dateFormat(){
    var data = this.novoContratante.dataNascimento;
    var splitted = data.split("-");
    var dia = splitted[2];
    var mes = splitted[1];
    var ano = splitted[0];
    this.novoContratante.dataNascimento = dia + "/" + mes + "/" + ano;
  }

  imgChangeListener(imageInput): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      if (event.target.result.length > 100000)
        this.toastr.error("A imagem deve ser menor que 100 kb");
      else
        this.novoContratante.imgPerfil = event.target.result;
    });
    reader.readAsDataURL(file);
  }

  verifyCard() {
    if (this.novoContratante.cartaoCredito != null) {
      this.money.validateCartao(this.novoContratante.cartaoCredito)
        .pipe(first())
        .subscribe(
          data => {
            this.toastr.success('Cartão válido');
          }, error => {
            this.toastr.error('Cartão inválido');
            console.log(error);
          }
        )
    } else {
      this.toastr.error('Preencha todos os campos antes de validar o cartão');
    }
  }


}
