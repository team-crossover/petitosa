import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contratante } from '../_models';
import { ContratanteService } from '../_services';

@Component({
  selector: 'app-perfil-contratante',
  templateUrl: './perfil-contratante.component.html',
  styleUrls: ['./perfil-contratante.component.css']
})
export class PerfilContratanteComponent implements OnInit {

  contratante: Contratante;
  error: any;
  servicosPrestados: boolean[] = [];
  precos: number[] = [];

  public idContratante: number;

  constructor(
    private route: ActivatedRoute,
    private contratanteService: ContratanteService
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idContratante = params['id'];
      }
    })
  }

  ngOnInit() {
    this.contratanteService.getContratante(this.idContratante).subscribe(data => {
      this.contratante = data;

      if (this.contratante.genero === "M") {
        this.contratante.genero = "Masculino";
      }
      else if (this.contratante.genero === "F") {
        this.contratante.genero = "Feminino";
      }
      else {
        this.contratante.genero = "Outros";
      }
    });
  }

}
