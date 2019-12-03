import { Component, OnInit } from '@angular/core';
import { SolicitacoesContratanteComponent } from '../solicitacoes-contratante/solicitacoes-contratante.component';
import { ServicoService } from '../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-desistir-solicitacao-contratante',
  templateUrl: './desistir-solicitacao-contratante.component.html',
  styleUrls: ['./desistir-solicitacao-contratante.component.css']
})
export class DesistirSolicitacaoContratanteComponent implements OnInit {

  private idServico;

  constructor(
    private servicoService: ServicoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private solicitacoesContratante: SolicitacoesContratanteComponent
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.idServico = params['id'];
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.servicoService.quitServico(this.idServico)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(['/ver-solicitacoes']);
            this.toastr.success('Você desistiu deste serviço com sucesso');
            this.solicitacoesContratante.loadContratanteAndSolicitacoes();
          }
        }
      )
  }

}
