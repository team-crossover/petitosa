import { Endereco } from './endereco';

export class Prestador {
    dataNascimento: string;
    descricao: string;
    email: string;
    endereco: Endereco;
    genero: string;
    id: number;
    idUsuario: number;
    nome: string;
    precos: number[];
    servicosPrestados: boolean[];
}