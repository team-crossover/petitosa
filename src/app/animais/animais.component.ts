import { Component, OnInit } from '@angular/core';
import { Animal } from '../_models';
import { AnimalService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {

  animais: Animal[] = [];
  idContratante: number;

  public imgAnimalDefault = 'assets/dogcat.jpg';

  constructor(
    private animalService: AnimalService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.loadAnimals();
  }

  loadAnimals() {
    this.auth.getCurrentUserContratante().subscribe(data => {
      this.idContratante = data.id;
      this.animalService.getAnimals(this.idContratante).subscribe(data => {
        this.animais = data;
      });
    });
  }

}
