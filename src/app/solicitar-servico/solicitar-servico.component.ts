import { Component, OnInit } from '@angular/core';
import { AnimalService, AuthenticationService} from '../_services';
import { ToastrService } from 'ngx-toastr';
import { ServicosPorAnimal, FiltroServico, Contratante, Animal, Endereco } from '../_models';

@Component({
  selector: 'app-solicitar-servico',
  templateUrl: './solicitar-servico.component.html',
  styleUrls: ['./solicitar-servico.component.css']
})
export class SolicitarServicoComponent implements OnInit {

  novoServico: ServicosPorAnimal = new ServicosPorAnimal;
  novoFiltro: FiltroServico = new FiltroServico;
  animais: Animal[] = [];
  contratante: Contratante = new Contratante();
  endereco: Endereco = new Endereco();
  error: any;

  idAnimal: number;
  banho: boolean;
  tosa: boolean;
  passeio: boolean;

  servicos: ServicosPorAnimal[] = [];
  checkboxes: boolean[] = [];
  tiposServicos: string[] = [];

  public idContratante: number;

  constructor(
    private animalService: AnimalService,
    private auth: AuthenticationService,
    public toastr: ToastrService
  ) {  }

  ngOnInit() {
    this.loadAnimais();
  }

  loadAnimais() {
    this.auth.getCurrentUserContratante().subscribe(data => {
      this.idContratante = data.id;
      this.animalService.getAnimals(this.idContratante).subscribe(data => {
        this.animais = data;
      });
    });
  }

  addServico() {
    this.checkboxToString();
    console.log(this.tiposServicos);
  }

  searchPrestadores() {

  }

  onSubmit() {

  }

  checkboxToString() {
    if (this.checkboxes[0]) {
      this.tiposServicos.push('BANHO');
    }
    if (this.checkboxes[1]) {
      this.tiposServicos.push('TOSA');
    }
    if (this.checkboxes[2]) {
      this.tiposServicos.push('PASSEIO');
    }
  }

}
