import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { VerSolicitacoesComponent } from '../ver-solicitacoes/ver-solicitacoes.component';

@Component({
  selector: 'app-desistir-servico',
  templateUrl: './desistir-servico.component.html',
  styleUrls: ['./desistir-servico.component.css']
})
export class DesistirServicoComponent implements OnInit {

  private idServico;

  constructor(
    private servicoService: ServicoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private verSolicitacoes: VerSolicitacoesComponent
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
            this.verSolicitacoes.loadSolicitacoes();
          }
        }
      )
  }

}
