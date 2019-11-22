import { NovoEndereco } from './novo-endereco';
import { ContaBancaria } from './conta-bancaria';

export class NovoPrestador {
    contaBancaria: ContaBancaria;
    dataNascimento: string;
    descricao: string;
    email: string;
    endereco: NovoEndereco;
    genero: string;
    nome: string;
    precos: number[];
    senha: string;
    servicosPrestados: boolean[];

    constructor() {
        this.endereco = new NovoEndereco();
        this.contaBancaria = new ContaBancaria();
    }
}