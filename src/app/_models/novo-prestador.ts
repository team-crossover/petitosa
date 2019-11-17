import { NovoEndereco } from './novo-endereco';

export class NovoPrestador {
    dataNascimento: string;
    descricao: string;
    email: string;
    endereco: NovoEndereco;
    genero: string;
    nome: string;
    precos: number[];
    senha: string;
    servicosPrestados: boolean[];
}