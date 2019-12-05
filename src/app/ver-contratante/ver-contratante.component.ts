import { Component, OnInit } from '@angular/core';
import { ContratanteService } from '../_services';
import { ActivatedRoute } from '@angular/router';
import { Contratante } from '../_models';

@Component({
  selector: 'app-ver-contratante',
  templateUrl: './ver-contratante.component.html',
  styleUrls: ['./ver-contratante.component.css']
})
export class VerContratanteComponent implements OnInit {

  contratante: Contratante = new Contratante();
  idContratante: number;

  public imgContratanteDefault = 'assets/avatar.jpg';

  isAuthenticated = false;
  userRole = '';

  constructor(
    private contratanteService: ContratanteService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.idContratante = null;
        this.idContratante = params['id'];
        console.log(this.idContratante);

      }
    })
  }

  ngOnInit() {
    this.loadContratante();
  }

  loadContratante() {
    this.contratanteService.getContratante(this.idContratante).subscribe(data => {
      this.contratante = data;

      if (this.contratante.genero === "M") {
        this.contratante.genero = "Masculino";
      }
      else if (this.contratante.genero === "F") {
        this.contratante.genero = "Feminino";
      }
      else {
        this.contratante.genero = "Outro";
      }
    });
  }


}
