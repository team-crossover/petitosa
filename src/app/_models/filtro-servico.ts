import { ServicosPorAnimal } from './servicos-por-animal';

export class FiltroServico {
    distanciaMaxima: number;
    idContratante: number;
    precoTotalMaximo: number;
    servicosPorAnimais: Array<ServicosPorAnimal>;

    constructor() {
        this.servicosPorAnimais = new Array<ServicosPorAnimal>();
    }
}