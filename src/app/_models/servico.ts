import { Avaliacao } from './avaliacao';
import { Endereco } from './endereco';
import { ServicosPorAnimal } from './servicos-por-animal';

export class Servico {
    avaliacao: Avaliacao;
    dataAceitacao: string;
    dataDesistencia: string;
    dataEsperadaRealizacao: string;
    dataInicioRealizacao: string;
    dataRejeicao: string;
    dataSolicitacao: string;
    dataTerminoRealizacao: string;
    enderecoEsperado: Endereco;
    id: number;
    idContratante: number;
    nomeContratante: string;
    idPrestador: number;
    nomePrestador : string;
    observacoes: string;
    servicosPorAnimais: Array<ServicosPorAnimal>; 
    status: string;
    precoServico: number;
    precoTotal: number;
    precoTaxaPetitosa: number;
    valorRecebidoPeloPrestador : number;
    taxaDesistenciaPagaPeloContratante : number;
    taxaDesistenciaAdicionadaAoPrestador : number;

    constructor() {
        this.avaliacao = new Avaliacao();
        this.enderecoEsperado = new Endereco();
        this.servicosPorAnimais = new Array<ServicosPorAnimal>();
    }
}