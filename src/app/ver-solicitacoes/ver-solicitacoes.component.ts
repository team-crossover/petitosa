import { Component, OnInit } from '@angular/core';
import { ServicosPorStatus } from '../_models';
import { ServicoService, AuthenticationService } from '../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-solicitacoes',
  templateUrl: './ver-solicitacoes.component.html',
  styleUrls: ['./ver-solicitacoes.component.css']
})
export class VerSolicitacoesComponent implements OnInit {

  public idPrestador: number;
  servicosPorStatus: ServicosPorStatus = new ServicosPorStatus();

  constructor(
    private auth: AuthenticationService,
    private servicoService: ServicoService,
    private toastr: ToastrService,
    private router: Router,
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
      });
    })
  }

  acceptSolicitacao(id) {
    this.servicoService.acceptServico(id).subscribe(data => {
      if (data) {
        this.toastr.success('Serviço aceito com sucesso');
        this.loadSolicitacoes();
      }
    })
  }

  startSolicitacao(id) {
    this.servicoService.startServico(id).subscribe(data => {
      if (data) {
        this.toastr.success('Serviço iniciado com sucesso');
        this.loadSolicitacoes();
      }
    });
  }

  finishSolicitacao(id) {
    this.servicoService.finishServico(id).subscribe(data => {
      if (data) {
        this.toastr.success('Serviço finalizado com sucesso');
        this.loadSolicitacoes();
      }
    });
  }

}
