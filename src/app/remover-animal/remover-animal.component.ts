import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AnimaisComponent } from '../animais/animais.component';

@Component({
  selector: 'app-remover-animal',
  templateUrl: './remover-animal.component.html',
  styleUrls: ['./remover-animal.component.css']
})
export class RemoverAnimalComponent implements OnInit {

  private idAnimal: number;

  constructor(
    private animalService: AnimalService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public animaisComponent: AnimaisComponent
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.idAnimal = params['id'];
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.animalService.removeAnimal(this.idAnimal)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(['/animais']);
            this.toastr.success('Animal removido com sucesso');
            this.animaisComponent.loadAnimals();
          }
        }
      )
  }

}
