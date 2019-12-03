import { Component, OnInit } from '@angular/core';
import { NovaAvaliacao } from '../_models';
import { ServicoService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-avaliar-servico',
  templateUrl: './avaliar-servico.component.html',
  styleUrls: ['./avaliar-servico.component.css']
})
export class AvaliarServicoComponent implements OnInit {

  idServico: number;
  novaAvaliacao: NovaAvaliacao = new NovaAvaliacao();

  constructor(
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
            // TODO: Nagevar para component de ver solicitações do cliente
            this.router.navigate(['']);
            this.toastr.success('Serviço avaliado com sucesso');
            // TODO: Chamar instância de component pai e recarregar a lista de solicitações
          }
          
        }
      )
  }

}
