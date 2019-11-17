import { Component, OnInit } from '@angular/core';
import { NovoPrestador } from '../_models';
import { PrestadorService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cadastrar-prestador',
  templateUrl: './cadastrar-prestador.component.html',
  styleUrls: ['./cadastrar-prestador.component.css']
})
export class CadastrarPrestadorComponent implements OnInit {

  SIZE_ARRAY = 15;

  novoPrestador: NovoPrestador = new NovoPrestador();
  error: string = null;
  servicosPrestados: boolean[] = [];
  precos: number[] = []; 

  constructor(
    public prestadorService: PrestadorService,
    public router: Router
  ) { }

  ngOnInit() {
    this.fillArrayBoolean(this.servicosPrestados);
    this.fillArrayNumber(this.precos);
  }

  onSubmit() {
    this.novoPrestador.servicosPrestados = this.servicosPrestados;
    this.novoPrestador.precos = this.precos;
    console.log(this.novoPrestador);
    this.prestadorService.createPrestador(this.novoPrestador)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(["/login"]);
          }
        }, 
        error => {
          this.error = JSON.stringify(error);
          console.log(this.error);
        }
      );
  }

  fillArrayBoolean(array: boolean[]) {
    for (let i = 0; i < this.SIZE_ARRAY; i++) {
      array[i] = false;
    }
  }

  fillArrayNumber(array: number[]) {
    for (let i = 0; i < this.SIZE_ARRAY; i++) {
      array[i] = 0;
    }
  }

}
