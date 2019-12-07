import { Component, OnInit } from '@angular/core';
import { ServicoService, AuthenticationService } from '../_services';
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
  servicoFoiAceito: boolean;

  constructor(
    private authService: AuthenticationService,
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
    console.log(this.authService.currentUserValue.id);

    this.servicoService.quitServico(this.idServico, this.authService.currentUserValue.id)
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
