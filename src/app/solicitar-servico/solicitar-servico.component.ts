import { Component, OnInit } from '@angular/core';
import { AnimalService, AuthenticationService, PrestadorService } from '../_services';
import { ToastrService } from 'ngx-toastr';
import { ServicosPorAnimal, FiltroServico, Contratante, Animal, Endereco, Prestador } from '../_models';
import { AnimalView } from '../_models/animal-view';

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

  servicos: ServicosPorAnimal[];
  checkboxes: boolean[] = [];
  tiposServicos: string[] = [];
  prestadores: Prestador[] = [];

  animalViews: AnimalView[] = [];
  precoMaximo: number;
  distanciaMaxima: number;

  public idContratante: number;

  constructor(
    private animalService: AnimalService,
    private auth: AuthenticationService,
    private prestadorService: PrestadorService,
    public toastr: ToastrService
  ) { }

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
    this.createNewAnimalView();

  }

  searchPrestadores() {
    this.servicos = [];
    this.animalViews.forEach(element => {
      let novoServico: ServicosPorAnimal = new ServicosPorAnimal();
      novoServico.idAnimal= element.id;
      novoServico.tiposServicos = element.tiposServicos;
      this.servicos.push(novoServico);
    });
    console.log(this.servicos);

  }

  onSubmit() {

  }

  createNewAnimalView() {

    let animalSelecionado: AnimalView = new AnimalView();
    let servicosSelecionados: string[] = [];

    if (this.checkboxes[0]) {
      servicosSelecionados.push('BANHO');
    }
    if (this.checkboxes[1]) {
      servicosSelecionados.push('TOSA');
    }
    if (this.checkboxes[2]) {
      servicosSelecionados.push('PASSEIO');
    }
    animalSelecionado.tiposServicos = servicosSelecionados;
    console.log(animalSelecionado.tiposServicos);

    animalSelecionado.id = this.idAnimal;
    this.animalService.getAnimal(this.idAnimal).subscribe(data => {
      animalSelecionado.porte = data.porte;
      animalSelecionado.especie = data.especie;
      animalSelecionado.apelido = data.apelido;
    });

    this.animalViews.push(animalSelecionado);

    //remover animal selecioado das opções de animais
    this.removeAnimalFromOptions(animalSelecionado.id);
  }

  removeAnimalView(id: number) {
    for (var i = 0; i < this.animalViews.length; i++) {
      if (this.animalViews[i].id === id) {
        this.animalViews.splice(i, 1);
      }
    }

    //retorna animal para as opções
    this.returnAnimalFromOptions(id);

  }

  removeAnimalFromOptions(id: number) {
    for (var i = 0; i < this.animais.length; i++) {
      var teste = this.animais[i].id
      if (teste === id) {
        this.animais.splice(i, 1);
      }
    }
  }

  returnAnimalFromOptions(id: number) {
    this.animalService.getAnimal(id).subscribe(data => {
      this.animais.push(data);
    });
  }

}
