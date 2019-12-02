import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contratante, Endereco, ServicosPorStatus, Servico } from '../_models';
import { ContratanteService, EnderecoService, AuthenticationService, ServicoService } from '../_services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-contratante',
  templateUrl: './perfil-contratante.component.html',
  styleUrls: ['./perfil-contratante.component.css']
})
export class PerfilContratanteComponent implements OnInit {

  contratante: Contratante = new Contratante();
  endereco: Endereco = new Endereco();
  error: any;
  servicosPrestados: boolean[] = [];
  precos: number[] = [];
  solicitacoes: ServicosPorStatus = new ServicosPorStatus();
  servicos: Array<Servico> = new Array<Servico>();

  public idContratante: number;

  public imgContratanteDefault = 'assets/avatar.jpg';

  isAuthenticated = false;
  userRole = '';

  constructor(
    private route: ActivatedRoute,
    private contratanteService: ContratanteService,
    private enderecoService: EnderecoService,
    private servicoService: ServicoService,
    public toastr: ToastrService,
    private auth: AuthenticationService
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idContratante = params['id'];
      }
    })
    this.verifyAuth();
  }

  ngOnInit() {
    this.loadContratante();
    this.loadSolicitacoes();
  }

  loadContratante() {
    this.contratanteService.getContratante(this.idContratante).subscribe(data => {
      this.contratante = data;
      this.loadEndereco(this.contratante.endereco.cep);

      if (this.contratante.genero === "M") {
        this.contratante.genero = "Masculino";
      }
      else if (this.contratante.genero === "F") {
        this.contratante.genero = "Feminino";
      }
      else {
        this.contratante.genero = "Outro";
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
        if (this.userRole == 'CONTRATANTE') {
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

  loadSolicitacoes() {
    this.servicoService.searchByContratante(this.idContratante).subscribe(data => {
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
