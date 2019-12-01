import { Component, OnInit } from '@angular/core';
import { ServicosPorStatus } from '../_models';
import { ServicoService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-ver-solicitacoes',
  templateUrl: './ver-solicitacoes.component.html',
  styleUrls: ['./ver-solicitacoes.component.css']
})
export class VerSolicitacoesComponent implements OnInit {

  public idPrestador: number;
  private servicosPorStatus: ServicosPorStatus = new ServicosPorStatus();

  constructor(
    private auth: AuthenticationService,
    private servicoService: ServicoService
  ) { }

  ngOnInit() {
    this.loadSolicitacoes();
  }

  loadSolicitacoes() {
    this.auth.getCurrentUserPrestador().subscribe(data => {
      this.idPrestador = data.id;
      this.servicoService.getByPrestador(this.idPrestador).subscribe(servicos => {
        this.servicosPorStatus = servicos;
        console.log(this.servicosPorStatus);
      })
    })
  }

}
