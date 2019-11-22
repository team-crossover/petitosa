import { Endereco } from './endereco';
import { ContaBancaria } from './conta-bancaria';

export class Prestador {
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
    precos: number[];
    servicosPrestados: boolean[];

    constructor() {
        this.contaBancaria = new ContaBancaria();
    }

}