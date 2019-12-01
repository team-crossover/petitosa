import { Component, OnInit } from '@angular/core';
import { Prestador } from '../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { PrestadorService } from '../_services';

@Component({
  selector: 'app-ver-prestador',
  templateUrl: './ver-prestador.component.html',
  styleUrls: ['./ver-prestador.component.css']
})
export class VerPrestadorComponent implements OnInit {

  private idPrestador: number;
  prestador: Prestador = new Prestador();

  constructor(
    private prestadorService: PrestadorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.idPrestador = params['id'];
      }
    });
  }

  ngOnInit() {
    this.loadPrestador();
  }

  loadPrestador(){
    this.prestadorService.getPrestador(this.idPrestador).subscribe(data => {
      this.prestador = data;
    });
  }

}
