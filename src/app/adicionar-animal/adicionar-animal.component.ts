import { Component, OnInit } from '@angular/core';
import { NovoAnimal } from '../_models';
import { AnimalService, AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adicionar-animal',
  templateUrl: './adicionar-animal.component.html',
  styleUrls: ['./adicionar-animal.component.css']
})
export class AdicionarAnimalComponent implements OnInit {

  novoAnimal: NovoAnimal = new NovoAnimal();

  constructor(
    private animalService: AnimalService,
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.getCurrentUserContratante().subscribe(data => {
      const idDono = data.id;
      this.dateFormat();
      this.animalService.createAnimal(idDono, this.novoAnimal)
        .pipe(first())
        .subscribe(
          data => {
            if (data) {
              this.toastr.success('Animal adicionado com sucesso');
              this.router.navigate(['/animais']);
            }
          }, error => {
            this.toastr.error(error.error.error);
          }
        )
    });
  }

  dateFormat(){
    var data = this.novoAnimal.dataNascimento;
    var splitted = data.split("-");
    var dia = splitted[2];
    var mes = splitted[1];
    var ano = splitted[0];
    this.novoAnimal.dataNascimento = dia + "/" + mes + "/" + ano;
  }

  imgChangeListener(imageInput): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      if (event.target.result.length > 10000000)
        this.toastr.error("A imagem deve ser menor que 10 MB");
      else
        this.novoAnimal.imgAnimal = event.target.result;
    });
    reader.readAsDataURL(file);
  }

}
