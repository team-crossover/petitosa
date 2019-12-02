import { Component, OnInit } from '@angular/core';
import { Animal, NovoAnimal } from '../_models';
import { AnimalService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AnimaisComponent } from '../animais/animais.component';

@Component({
  selector: 'app-editar-animal',
  templateUrl: './editar-animal.component.html',
  styleUrls: ['./editar-animal.component.css']
})
export class EditarAnimalComponent implements OnInit {

  private idAnimal: number;

  novoAnimal: NovoAnimal = new NovoAnimal();
  animal: Animal = new Animal();

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
    this.patchAnimal();
  }

  patchAnimal() {
    this.animalService.getAnimal(this.idAnimal).subscribe(data => {
      this.animal = data;
      this.novoAnimal.apelido = this.animal.apelido;
      this.novoAnimal.dataNascimento = this.animal.dataNascimento;
      this.novoAnimal.especie = this.animal.especie;
      this.novoAnimal.imgAnimal = this.animal.imgAnimal;
      this.novoAnimal.observacoes = this.animal.observacoes;
      this.novoAnimal.porte = this.animal.porte;
      this.novoAnimal.raca = this.animal.raca;
      this.dateFormatToSee();
    });

  }

  onSubmit() {
    this.dateFormatToSave();
    this.animalService.updateAnimal(this.idAnimal, this.novoAnimal)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            console.log(this.novoAnimal);
            this.toastr.success('Animal atualizado com sucesso');
            this.animaisComponent.loadAnimals();
            this.router.navigate(['/animais']);
          }
        }, error => {
          console.log(error);
        }
      )

  }

  dateFormatToSave(){
    //yyyy-mm-dd to dd/mm/yyyy
    var data = this.novoAnimal.dataNascimento;
    var splitted = data.split("-");
    var dia = splitted[2];
    var mes = splitted[1];
    var ano = splitted[0];
    this.novoAnimal.dataNascimento = dia + "/" + mes + "/" + ano;
  }

  dateFormatToSee(){
    //dd/mm/yyyy to yyyy-mm-dd
    var data = this.novoAnimal.dataNascimento;
    var splitted = data.split("/");
    var dia = splitted[0];
    var mes = splitted[1];
    var ano = splitted[2];
    this.novoAnimal.dataNascimento = ano + "-" + mes + "-" + dia;
  }

  imgChangeListener(imageInput): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      if (event.target.result.length > 100000)
        this.toastr.error("A imagem deve ser menor que 100 kb");
      else
        this.novoAnimal.imgAnimal = event.target.result;
    });
    reader.readAsDataURL(file);
  }

}
