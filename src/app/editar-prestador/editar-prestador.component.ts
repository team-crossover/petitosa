import { Component, OnInit } from '@angular/core';
import { NovoPrestador, Prestador } from '../_models';
import { PrestadorService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-editar-prestador',
  templateUrl: './editar-prestador.component.html',
  styleUrls: ['./editar-prestador.component.css']
})
export class EditarPrestadorComponent implements OnInit {

  prestador: Prestador;
  novoPrestador: NovoPrestador = new NovoPrestador();
  error: string = null;

  idPrestador: number;

  constructor(
    public prestadorService: PrestadorService,
    public router: Router
  ) { }

  ngOnInit() {
    this.patchNovoPrestador();
  }

  patchNovoPrestador() {
    this.prestadorService.getPrestador(this.idPrestador).subscribe(data => {
      this.prestador = data;
      this.novoPrestador.dataNascimento = this.prestador.dataNascimento;
      this.novoPrestador.descricao = this.prestador.descricao;
      this.novoPrestador.email = this.prestador.email;
      this.novoPrestador.endereco.cep = this.prestador.endereco.cep;
      this.novoPrestador.endereco.logradouro = this.prestador.endereco.logradouro;
      this.novoPrestador.genero = this.prestador.genero;
      this.novoPrestador.nome = this.prestador.nome;
      this.novoPrestador.precos = this.prestador.precos;
      this.novoPrestador.servicosPrestados = this.prestador.servicosPrestados;
    });
  }

  onSubmit() {
    console.log(this.novoPrestador);
    this.prestadorService.updatePrestador(this.idPrestador, this.novoPrestador)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(["/login"]);
          }
        }, 
        error => {
          this.error = JSON.stringify(error);
        }
      );
  }

}
