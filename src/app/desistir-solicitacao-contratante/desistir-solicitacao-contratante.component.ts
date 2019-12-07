import { Component, OnInit } from '@angular/core';
import { SolicitacoesContratanteComponent } from '../solicitacoes-contratante/solicitacoes-contratante.component';
import { ServicoService, AuthenticationService } from '../_services';
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
  servicoFoiAceito: boolean;

  constructor(
    private authService: AuthenticationService,
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
    this.loadServico();
  }

  loadServico() {
    this.servicoService.getServico(this.idServico).subscribe(data => {
      if (data) {
        this.servicoFoiAceito = data.status == "ACEITO";
      }
    });
  }

  onSubmit() {
    this.servicoService.quitServico(this.idServico, this.authService.currentUserValue.id)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(['/solicitacoes-contratante']);
            this.toastr.success('Você desistiu deste serviço com sucesso');
            this.solicitacoesContratante.loadContratanteAndSolicitacoes();
          }
        }
      )
  }

}
