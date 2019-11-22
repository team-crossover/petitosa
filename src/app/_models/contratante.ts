import { Endereco } from './endereco';
import { CartaoCredito } from './cartao-credito';

export class Contratante {
    cartaoCredito: CartaoCredito;
    dataNascimento: string;
    email: string;
    endereco: Endereco;
    genero: string;
    id: number;
    idUsuario: number;
    idsAnimais: number[];
    imgPerfil: string;
    nome: string;

    constructor() {
        this.endereco = new Endereco();
        this.cartaoCredito = new CartaoCredito();
    }

}