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

  novoPrestador: NovoPrestador = new NovoPrestador();
  error: string = null;

  constructor(
    public prestadorService: PrestadorService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
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
        }
      );
  }

}
