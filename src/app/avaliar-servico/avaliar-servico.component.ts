import { Component, OnInit } from '@angular/core';
import { NovaAvaliacao } from '../_models';
import { ServicoService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { SolicitacoesContratanteComponent } from '../solicitacoes-contratante/solicitacoes-contratante.component';

@Component({
  selector: 'app-avaliar-servico',
  templateUrl: './avaliar-servico.component.html',
  styleUrls: ['./avaliar-servico.component.css']
})
export class AvaliarServicoComponent implements OnInit {

  idServico: number;
  novaAvaliacao: NovaAvaliacao = new NovaAvaliacao();

  constructor(
    private solicitacoesContratante: SolicitacoesContratanteComponent,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private servicoService: ServicoService
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
    this.servicoService.rateServico(this.idServico, this.novaAvaliacao)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(["/solicitacoes-contratante"]);
            this.toastr.success('Serviço avaliado com sucesso');
            this.solicitacoesContratante.loadContratanteAndSolicitacoes();
          }
          
        }
      )
  }

}
