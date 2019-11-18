import { Component, OnInit } from '@angular/core';
import { NovoPrestador } from '../_models';
import { PrestadorService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-prestador',
  templateUrl: './cadastrar-prestador.component.html',
  styleUrls: ['./cadastrar-prestador.component.css']
})
export class CadastrarPrestadorComponent implements OnInit {

  SIZE_ARRAY = 15;

  novoPrestador: NovoPrestador = new NovoPrestador();
  error: any;
  servicosPrestados: boolean[] = [];
  precos: number[] = []; 

  constructor(
    public prestadorService: PrestadorService,
    public router: Router,
    public toastr: ToastrService
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
            this.toastr.success('Prestador de serviços cadastrado com sucesso');
            this.router.navigate(["/login"]);
          }
        }, 
        error => {
          console.log(error);
          this.toastr.error(error.error);
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
