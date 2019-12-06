import { Component, OnInit } from '@angular/core';
import { NovoContratante, Contratante, Endereco } from '../_models';
import { ContratanteService, AuthenticationService, EnderecoService, MoneyService } from '../_services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PerfilContratanteComponent } from '../perfil-contratante/perfil-contratante.component';
import { first } from 'rxjs/operators';
import { AppComponent } from '../app.component';

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
    private perfilContratante: PerfilContratanteComponent,
    private money: MoneyService,
    private appComponent: AppComponent
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
      this.novoContratante.cartaoCredito.cvv = this.contratante.cartaoCredito.cvv;
      this.novoContratante.cartaoCredito.numero = this.contratante.cartaoCredito.numero;
      this.novoContratante.cartaoCredito.validade = this.contratante.cartaoCredito.validade;

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
            if (this.novoContratante.senha) {
              this.auth.logout();
              this.router.navigate(["/login"]);
            } else {
              this.appComponent.loadUsername();
              this.perfilContratante.loadContratante();
              this.router.navigate(["/perfil-contratante/" + this.idContratante]);
            }
          }
        }, 
        error => {
          this.toastr.error(error.error.error);
        }
      );
  }

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
