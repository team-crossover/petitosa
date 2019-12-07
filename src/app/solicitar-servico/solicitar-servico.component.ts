import { Component, OnInit } from '@angular/core';
import { AnimalService, AuthenticationService, PrestadorService, ServicoService } from '../_services';
import { ToastrService } from 'ngx-toastr';
import { ServicosPorAnimal, FiltroServico, Contratante, Animal, Endereco, Prestador, PrestadorEncontrado } from '../_models';
import { AnimalView } from '../_models/animal-view';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-servico',
  templateUrl: './solicitar-servico.component.html',
  styleUrls: ['./solicitar-servico.component.css']
})
export class SolicitarServicoComponent implements OnInit {

  public imgPrestadorDefault = 'assets/avatar.jpg';

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
  taxaDesistenciaAPagar: number = 0;
  public novoFiltro: FiltroServico = new FiltroServico;

  constructor(
    private animalService: AnimalService,
    private auth: AuthenticationService,
    private router: Router,
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
        //Redireciona para cadastro de animais se não houver nenhum
        if (data.length == 0) {
          this.toastr.info('Cadastre animais para poder solicitar serviços');
          this.router.navigate(["/adicionar-animal"]);
        }
        this.animais = data;
        if (data.length > 0)
          this.currentAnimal = this.animais[0];
      });
    });
  }

  searchPrestadores() {
    this.servicos = [];
    this.animalViews.forEach(element => {
      let novoServico: ServicosPorAnimal = new ServicosPorAnimal();
      novoServico.idAnimal = element.id;
      novoServico.apelidoAnimal = element.apelido;
      novoServico.especieAnimal = element.especie;
      novoServico.porteAnimal = element.porte;
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
      this.checkboxes[0] = false;
      servicosSelecionados.push('BANHO');
    }
    if (this.checkboxes[1]) {
      this.checkboxes[1] = false;
      servicosSelecionados.push('TOSA');
    }
    if (this.checkboxes[2]) {
      this.checkboxes[2] = false;
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
    if (this.animais.length == 0)
      this.currentAnimal = null;
    else
      this.currentAnimal = this.animais[0];
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
