import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Prestador, Endereco, ServicosPorStatus, Servico } from '../_models';
import { PrestadorService, EnderecoService, AuthenticationService, ServicoService } from '../_services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.css']
})
export class PerfilPrestadorComponent implements OnInit {

  public idPrestador: number;
  prestador: Prestador = new Prestador();
  endereco: Endereco = new Endereco();
  error: any;
  servicosPrestados: boolean[] = [];
  precos: number[] = [];

  public imgPrestadorDefault = 'assets/avatar.jpg';

  isAuthenticated = false;
  userRole = '';

  solicitacoes: ServicosPorStatus = new ServicosPorStatus();
  servicos: Array<Servico> = new Array<Servico>();

  constructor(
    private route: ActivatedRoute,
    private prestadorService: PrestadorService,
    private enderecoService: EnderecoService,
    public toastr: ToastrService,
    private auth: AuthenticationService,
    private servicoService: ServicoService
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idPrestador = params['id'];
      }
    })
  }

  ngOnInit() {
    this.loadPrestador();
    this.verifyAuth();
    this.loadUltimasAvaliacoes();
  }

  loadPrestador() {
    this.prestadorService.getPrestador(this.idPrestador).subscribe(data => {
      this.prestador = data;
      this.precos = this.prestador.precos;
      this.servicosPrestados = this.prestador.servicosPrestados;
      this.loadEndereco(this.prestador.endereco.cep);

      if (this.prestador.genero === "M") {
        this.prestador.genero = "Masculino";
      }
      else if (this.prestador.genero === "F") {
        this.prestador.genero = "Feminino";
      }
      else {
        this.prestador.genero = "Outro";
      }
    });
  }

  loadEndereco(cep: number) {
    this.enderecoService.getEndereco(cep).subscribe(data => {
      this.endereco = data;
      console.log(this.endereco);
    }, error => {
      this.toastr.error(error.error.error);
    });
  }

  verifyAuth() {
    this.auth.currentUser.subscribe(user => {
      if (user) {
        this.userRole = user.role;
        if (this.userRole == 'PRESTADOR') {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        } 
      } else {
        this.isAuthenticated = false;
        this.userRole = null;
      }
    })

  }

  loadUltimasAvaliacoes() {
    this.servicoService.getByPrestador(this.idPrestador).subscribe(data => {
      this.solicitacoes = data;
      for (let i = this.solicitacoes.terminados.length - 1; i >= 0; i --) {
        if (this.servicos.length < 3) {
          this.servicos.push(this.solicitacoes.terminados[i]);
          console.log(this.solicitacoes.terminados[i]);
        }
      }
    });
  }

}
