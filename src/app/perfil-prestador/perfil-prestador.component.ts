import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Prestador } from '../_models';
import { PrestadorService } from '../_services';

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.css']
})
export class PerfilPrestadorComponent implements OnInit {

  public idPrestador: number;
  prestador: Prestador;
  error: any;
  servicosPrestados: boolean[] = [];
  precos: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private prestadorService: PrestadorService
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idPrestador = params['id'];
      }
    })
  }

  ngOnInit() {
    this.prestadorService.getPrestador(this.idPrestador).subscribe(data => {
      this.prestador = data;
      this.precos = this.prestador.precos;
      this.servicosPrestados = this.prestador.servicosPrestados;

      if (this.prestador.genero === "M") {
        this.prestador.genero = "Masculino";
      }
      else if (this.prestador.genero === "F") {
        this.prestador.genero = "Feminino";
      }
      else {
        this.prestador.genero = "Outros";
      }
    });
  }
}
