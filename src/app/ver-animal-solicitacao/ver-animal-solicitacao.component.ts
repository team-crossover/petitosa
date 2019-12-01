import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../_services';
import { Animal } from '../_models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-animal-solicitacao',
  templateUrl: './ver-animal-solicitacao.component.html',
  styleUrls: ['./ver-animal-solicitacao.component.css']
})
export class VerAnimalSolicitacaoComponent implements OnInit {

  private idAnimal;
  animal: Animal = new Animal();
  public imgAnimalDefault = 'assets/dogcat.jpg';

  constructor(
    private animalService: AnimalService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.idAnimal = params['id'];
      }
    });
  }

  ngOnInit() {
    this.loadAnimal();
  }

  loadAnimal() {
    this.animalService.getAnimal(this.idAnimal).subscribe(data => {
      this.animal = data;
      console.log(this.animal);
    });
  }

}
