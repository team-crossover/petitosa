import { Component, OnInit } from '@angular/core';
import { NovoContratante } from '../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { ContratanteService } from '../_services';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
    public router: Router,
    public toastr: ToastrService
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
            this.toastr.success('Contratante cadastrado com sucesso');
            this.router.navigate(["/login"]);
          }
        }, 
        error => {
          this.toastr.error(error.error);
          console.log(this.error);
        }
      );
  }

}
