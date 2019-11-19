import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Prestador, Endereco } from '../_models';
import { PrestadorService, EnderecoService } from '../_services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.css']
})
export class PerfilPrestadorComponent implements OnInit {

  public idPrestador: number;
  prestador: Prestador = new Prestador();
  endereco: Endereco = new Endereco();
  error: any;
  servicosPrestados: boolean[] = [];
  precos: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private prestadorService: PrestadorService,
    private enderecoService: EnderecoService,
    public toastr: ToastrService
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idPrestador = params['id'];
      }
    })
  }

  ngOnInit() {
    this.loadPrestador();
  }

  loadPrestador() {
    this.prestadorService.getPrestador(this.idPrestador).subscribe(data => {
      this.prestador = data;
      this.precos = this.prestador.precos;
      this.servicosPrestados = this.prestador.servicosPrestados;
      this.loadEndereco(this.prestador.endereco.cep);

      if (this.prestador.genero === "M") {
        this.prestador.genero = "Masculino";
      }
      else if (this.prestador.genero === "F") {
        this.prestador.genero = "Feminino";
      }
      else {
        this.prestador.genero = "Outro";
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
