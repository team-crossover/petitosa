import { ServicosPorAnimal } from './servicos-por-animal';

export class SolicitacaoServico {
    dataEsperada: string;
    idContratante: number;
    idPrestador: number;
    observacoes: string;
    servicosPorAnimais: Array<ServicosPorAnimal>;

    constructor() {
        this.servicosPorAnimais = new Array<ServicosPorAnimal>();
    }
}