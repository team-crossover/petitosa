import { Component, OnInit } from '@angular/core';
import { Prestador, Contratante, FiltroServico, SolicitacaoServico, PrestadorEncontrado } from '../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { PrestadorService, AuthenticationService, ServicoService } from '../_services';
import { ToastrService } from 'ngx-toastr';
import { SolicitarServicoComponent } from '../solicitar-servico/solicitar-servico.component';
import { first } from 'rxjs/operators';
import { formatDate } from '@angular/common';

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
  prestadores: PrestadorEncontrado[] = [];

  dataMinima: Date;
  dataServico: string;
  horaServico: string;
  observacoes: string;
  preco: number;
  taxa: number = 1.25;
  nomePrestador: string;

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
        this.idPrestador = null;
        this.idPrestador = params['id'];
        this.loadInfo();
      }
    });
  }

  ngOnInit() {
    this.filtroServico = this.solicitarComponent.novoFiltro;
    this.setTomorrow();
    this.loadContratante();
  }

  loadInfo() {
    this.prestadores = this.solicitarComponent.prestadoresEncontrados;
    this.prestadores.forEach(element => {
      if (element.idPrestador == this.idPrestador) {
        this.preco = element.precoTotal;
        this.nomePrestador = element.nome;
      }
    });
  }

  setTomorrow(){
    var tomorrow: Date = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.dataMinima = tomorrow;
    this.dataServico = formatDate(tomorrow, 'yyyy-MM-dd', 'en');
  }

  loadContratante() {
    this.auth.getCurrentUserContratante().subscribe(data => {
      this.contratante = data;
    });
  }

  onSubmit() {
    this.dateAndTimeFormatToSave();
    this.novaSolicitacao.idPrestador = this.idPrestador;
    this.novaSolicitacao.observacoes = this.observacoes;
    this.novaSolicitacao.idContratante = this.contratante.id;
    this.novaSolicitacao.servicosPorAnimais = this.filtroServico.servicosPorAnimais;

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

  dateAndTimeFormatToSave() {
    //required: hh:mm dd/MM/yyyy 
    var data = this.dataServico;
    var splitted = data.split("-");
    var dia = splitted[2];
    var mes = splitted[1];
    var ano = splitted[0];
    this.dataServico = dia + "/" + mes + "/" + ano;

    this.novaSolicitacao.dataEsperada = this.horaServico + " " + this.dataServico;
  }

}
