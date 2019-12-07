import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ServicoService } from '../_services';
import { ToastrService } from 'ngx-toastr';
import { SolicitacaoServico, ServicosPorStatus } from '../_models';

@Component({
  selector: 'app-solicitacoes-contratante',
  templateUrl: './solicitacoes-contratante.component.html',
  styleUrls: ['./solicitacoes-contratante.component.css']
})
export class SolicitacoesContratanteComponent implements OnInit {

  idContratante: number;
  servicosPorStatus: ServicosPorStatus = new ServicosPorStatus();
  taxaDesistenciaAPagar : number = 0;

  constructor(
    private auth: AuthenticationService,
    private servicoService: ServicoService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadContratanteAndSolicitacoes();
  }

  loadContratanteAndSolicitacoes() {
    this.auth.getCurrentUserContratante().subscribe(data => {
      this.idContratante = data.id;
      this.servicoService.searchByContratante(this.idContratante).subscribe(servicos => {
        this.servicosPorStatus = servicos;
      });
    });
  }

}
