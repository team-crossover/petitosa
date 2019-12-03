import { Component, OnInit } from '@angular/core';
import { Prestador, Contratante, FiltroServico, SolicitacaoServico, PrestadorEncontrado } from '../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { PrestadorService, AuthenticationService, ServicoService } from '../_services';
import { ToastrService } from 'ngx-toastr';
import { SolicitarServicoComponent } from '../solicitar-servico/solicitar-servico.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-confirmar-solicitar-servico',
  templateUrl: './confirmar-solicitar-servico.component.html',
  styleUrls: ['./confirmar-solicitar-servico.component.css']
})
export class ConfirmarSolicitarServicoComponent implements OnInit {
  
    private idPrestador: number;
    prestador: Prestador = new Prestador();
    contratante: Contratante = new Contratante();
    filtroServico: FiltroServico = new FiltroServico;
    prestadoresEncontrados: PrestadorEncontrado[] = [];
    distancia: number;
    precoTotal: number;

    dataServico: string;
    horaServico: string;
    observacoes: string;

    novaSolicitacao: SolicitacaoServico = new SolicitacaoServico();
  
    constructor(
      private prestadorService: PrestadorService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private auth: AuthenticationService,
      private servicoService: ServicoService,
      private solicitarComponent: SolicitarServicoComponent,
      public toastr: ToastrService
    ) { 
      this.activatedRoute.params.subscribe(params => {
        if (params['id']) {
          this.idPrestador = params['id'];
        }
      });
    }
  
    ngOnInit() {
      this.filtroServico = this.solicitarComponent.novoFiltro;
      this.loadPrestador();
      this.loadContratante();
    }

    loadContratante() {
      this.auth.getCurrentUserContratante().subscribe(data => {
        this.contratante = data;
      });
    }
  
    loadPrestador(){
      this.prestadorService.getPrestador(this.idPrestador).subscribe(data => {
        this.prestador = data;
      });
    }

    onSubmit(){
      this.dateAndTimeFormatToSave();
      this.novaSolicitacao.idPrestador = this.idPrestador;
      console.log(this.novaSolicitacao.idPrestador);
      this.novaSolicitacao.observacoes = this.observacoes;
      console.log(this.novaSolicitacao.observacoes);
      this.novaSolicitacao.idContratante = this.contratante.id;
      console.log(this.novaSolicitacao.idContratante);
      this.novaSolicitacao.servicosPorAnimais = this.filtroServico.servicosPorAnimais;
      console.log(this.novaSolicitacao.servicosPorAnimais);

      this.servicoService.requestServico(this.novaSolicitacao).pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.toastr.success('Solicitação de serviço requisitada com sucesso');
            this.router.navigate(["/solicitacoes-contratante"]);
          }
        }, 
        error => {
          console.log(error);
          this.toastr.error('Não foi possível efetuar a solicitação');
        }
      );

    }

    dateAndTimeFormatToSave(){
      //required: hh:mm dd/MM/yyyy 
      var data = this.dataServico;
      var splitted = data.split("-");
      var dia = splitted[2];
      var mes = splitted[1];
      var ano = splitted[0];
      this.dataServico = dia + "/" + mes + "/" + ano;

      this.novaSolicitacao.dataEsperada = this.horaServico + " " + this.dataServico;
      console.log(this.novaSolicitacao.dataEsperada);
    }
  
  }
  