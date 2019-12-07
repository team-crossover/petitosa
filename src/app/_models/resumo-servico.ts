import { Avaliacao } from './avaliacao';
import { ServicosPorAnimal } from './servicos-por-animal';

export class ResumoServico {
    avaliacao: Avaliacao;
    dataSolicitacao: string;
    id: number;
    idContratante: number;
    idPrestador: number;
    nomeContratante: string;
    nomePrestador: string;
    servicosPorAnimais: Array<ServicosPorAnimal>;
    dataTermino:string;

    constructor() {
        this.avaliacao = new Avaliacao();
        this.servicosPorAnimais = new Array<ServicosPorAnimal>();
    }
}