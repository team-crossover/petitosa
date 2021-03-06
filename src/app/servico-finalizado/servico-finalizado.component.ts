import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../_services';
import { Servico } from '../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { first, delay, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';

@Component({
  selector: 'app-servico-finalizado',
  templateUrl: './servico-finalizado.component.html',
  styleUrls: ['./servico-finalizado.component.css']
})
export class ServicoFinalizadoComponent implements OnInit {

  private idServico;
  servico: Servico;

  constructor(
    private servicoService: ServicoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
    timer(750).pipe(switchMap(() => this.servicoService.getServico(this.idServico))).subscribe(data => {
      console.log(data)
      if (data) {
        this.servico = data;
      }
    });
  }
}
