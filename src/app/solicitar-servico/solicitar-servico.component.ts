import { Component, OnInit } from '@angular/core';
import { AnimalService, AuthenticationService, PrestadorService, ServicoService } from '../_services';
import { ToastrService } from 'ngx-toastr';
import { ServicosPorAnimal, FiltroServico, Contratante, Animal, Endereco, Prestador, PrestadorEncontrado } from '../_models';
import { AnimalView } from '../_models/animal-view';

@Component({
  selector: 'app-solicitar-servico',
  templateUrl: './solicitar-servico.component.html',
  styleUrls: ['./solicitar-servico.component.css']
})
export class SolicitarServicoComponent implements OnInit {

  /**
   * TODO: 
   * - Perfil de prestador (esperar a natália atualizar o perfil, vou só copiar) 
   */

  public imgPrestadorDefault = '/assets/person.png';

  novoFiltro: FiltroServico = new FiltroServico;
  animais: Animal[] = [];
  error: any;

  //idAnimal: number;
  currentAnimal: Animal = new Animal();
  servicos: ServicosPorAnimal[];
  checkboxes: boolean[] = [];
  prestadoresEncontrados: PrestadorEncontrado[] = [];

  animalViews: AnimalView[] = [];
  precoMaximo: number;
  distanciaMaxima: number;

  public idContratante: number;

  constructor(
    private animalService: AnimalService,
    private auth: AuthenticationService,
    private servicoService: ServicoService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadAnimaisAndContratante();
  }

  loadAnimaisAndContratante() {
    this.auth.getCurrentUserContratante().subscribe(data => {
      this.idContratante = data.id;
      this.animalService.getAnimals(this.idContratante).subscribe(data => {
        this.animais = data;
      });
    });
  }

  searchPrestadores() {
    this.servicos = [];
    this.animalViews.forEach(element => {
      let novoServico: ServicosPorAnimal = new ServicosPorAnimal();
      novoServico.idAnimal = element.id;
      novoServico.tiposServicos = element.tiposServicos;
      this.servicos.push(novoServico);
    });
    this.novoFiltro.servicosPorAnimais = this.servicos;
    this.novoFiltro.idContratante = this.idContratante;
    this.novoFiltro.distanciaMaxima = this.distanciaMaxima;
    this.novoFiltro.precoTotalMaximo = this.precoMaximo;

    this.servicoService.searchPrestadores(this.novoFiltro).subscribe(data => {
      this.prestadoresEncontrados = data;

      if (data.length > 0) {
        this.toastr.success(data.length + ' Prestadores de serviços encontrados');
      } else {
        this.toastr.error('Nenhum prestador encontrado. Tente alterar suas opções de busca');
      }
    });

  }

  addServico() {
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

    animalSelecionado.id = this.currentAnimal.id;
      animalSelecionado.porte = this.currentAnimal.porte;
      animalSelecionado.especie = this.currentAnimal.especie;
      animalSelecionado.apelido = this.currentAnimal.apelido;

    this.animalViews.push(animalSelecionado);

    //remover animal selecioado das opções
    this.removeAnimalFromOptions(animalSelecionado.id);

    //Limpa a busca de prestadores
    this.clearPrestadores();
  }

  removeServico(id: number) {
    for (var i = 0; i < this.animalViews.length; i++) {
      if (this.animalViews[i].id == id) {
        this.animalViews.splice(i, 1);
        break;
      }
    }

    //retorna animal para as opções
    this.returnAnimalToOptions(id);

    //Limpa a busca de prestadores
    this.clearPrestadores();
  }

  removeAnimalFromOptions(id: number) {
    for (var i = 0; i < this.animais.length; i++) {
      if (this.animais[i].id == id) {
        this.animais.splice(i, 1);
        break;
      }
    }
    this.currentAnimal = null;
  }

  returnAnimalToOptions(id: number) {
    this.animalService.getAnimal(id).subscribe(data => {
      this.animais.push(data);
    });
  }

  clearPrestadores() {
    this.prestadoresEncontrados = [];
  }

  showPrestadores() {
    return this.prestadoresEncontrados.length > 0;
  }

}
