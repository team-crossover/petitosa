import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contratante, Endereco } from '../_models';
import { ContratanteService, EnderecoService } from '../_services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-contratante',
  templateUrl: './perfil-contratante.component.html',
  styleUrls: ['./perfil-contratante.component.css']
})
export class PerfilContratanteComponent implements OnInit {

  contratante: Contratante = new Contratante();
  endereco: Endereco = new Endereco();
  error: any;
  servicosPrestados: boolean[] = [];
  precos: number[] = [];

  public idContratante: number;

  public imgContratanteDefault = 'assets/avatar.jpg';

  constructor(
    private route: ActivatedRoute,
    private contratanteService: ContratanteService,
    private enderecoService: EnderecoService,
    public toastr: ToastrService
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idContratante = params['id'];
      }
    })
  }

  ngOnInit() {
    this.loadContratante();
  }

  loadContratante() {
    this.contratanteService.getContratante(this.idContratante).subscribe(data => {
      this.contratante = data;
      this.loadEndereco(this.contratante.endereco.cep);

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
  
  loadEndereco(cep: number) {
    this.enderecoService.getEndereco(cep).subscribe(data => {
      this.endereco = data;
      console.log(this.endereco);
    }, error => {
      this.toastr.error(error.error.error);
    });
  }

}
