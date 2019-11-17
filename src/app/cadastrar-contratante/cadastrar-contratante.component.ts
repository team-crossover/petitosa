import { Component, OnInit } from '@angular/core';
import { NovoContratante } from '../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { ContratanteService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cadastrar-contratante',
  templateUrl: './cadastrar-contratante.component.html',
  styleUrls: ['./cadastrar-contratante.component.css']
})
export class CadastrarContratanteComponent implements OnInit {

  novoContratante: NovoContratante = new NovoContratante();
  error: string = null;


  constructor(
    public contratanteService: ContratanteService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.novoContratante);
    this.contratanteService.createContratante(this.novoContratante)
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

}
