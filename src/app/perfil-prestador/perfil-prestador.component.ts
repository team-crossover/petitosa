import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.css']
})
export class PerfilPrestadorComponent implements OnInit {

  public idPrestador: number;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idPrestador = params['id'];
      }
    })
  }

  ngOnInit() {
  }

}
