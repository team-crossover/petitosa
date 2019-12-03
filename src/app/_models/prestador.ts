import { Endereco } from './endereco';
import { ContaBancaria } from './conta-bancaria';
import { ResumoServico } from './resumo-servico';

export class Prestador {
    avaliacao: number;
    contaBancaria: ContaBancaria;
    dataNascimento: string;
    descricao: string;
    email: string;
    endereco: Endereco;
    genero: string;
    id: number;
    idUsuario: number;
    imgPerfil: string;
    nome: string;
    notaMedia: number;
    precos: number[];
    servicosPrestados: boolean[];
    ultimosServicos: Array<ResumoServico>;

    constructor() {
        this.endereco = new Endereco();
        this.contaBancaria = new ContaBancaria();
        this.ultimosServicos = new Array<ResumoServico>();
    }

}