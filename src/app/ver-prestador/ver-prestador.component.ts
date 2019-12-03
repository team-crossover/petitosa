import { Component, OnInit } from '@angular/core';
import { Prestador, Endereco, ServicosPorStatus, Servico } from '../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { PrestadorService, ServicoService, EnderecoService } from '../_services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ver-prestador',
  templateUrl: './ver-prestador.component.html',
  styleUrls: ['./ver-prestador.component.css']
})
export class VerPrestadorComponent implements OnInit {

  public idPrestador: number;
  prestador: Prestador = new Prestador();
  endereco: Endereco = new Endereco();
  error: any;
  solicitacoes: ServicosPorStatus = new ServicosPorStatus();
  servicos: Array<Servico> = new Array<Servico>();

  public imgPrestadorDefault = 'assets/avatar.jpg';

  constructor(
    private prestadorService: PrestadorService,
    private activatedRoute: ActivatedRoute,
    private enderecoService: EnderecoService,
    public toastr: ToastrService,
    private servicoService: ServicoService
  ) { 
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.idPrestador = null;
        this.idPrestador = params['id'];
      }
    });
  }

  ngOnInit() {
    this.loadPrestador();
    this.loadUltimasAvaliacoes();
  }

  loadPrestador() {
    this.prestadorService.getPrestador(this.idPrestador).subscribe(data => {
      this.prestador = data;
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
    }, error => {
      this.toastr.error(error.error.error);
    });
  }


  loadUltimasAvaliacoes() {
    this.servicoService.getByPrestador(this.idPrestador).subscribe(data => {
      this.solicitacoes = data;
      for (let i = this.solicitacoes.terminados.length - 1; i >= 0; i --) {
        if (this.servicos.length < 3) {
          if (this.solicitacoes.terminados[i].avaliacao) {
            this.servicos.push(this.solicitacoes.terminados[i]);
            console.log(this.solicitacoes.terminados[i]);
          }
        }
      }
    });
  }

}
