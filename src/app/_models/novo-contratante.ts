import { NovoEndereco } from './novo-endereco';
import { CartaoCredito } from './cartao-credito';

export class NovoContratante {
    cartaoCredito: CartaoCredito;
    dataNascimento: string;
    email: string;
    endereco: NovoEndereco;
    genero: string;
    imgPerfil: string;
    nome: string;
    senha: string;

    constructor() {
        this.endereco = new NovoEndereco();
        this.cartaoCredito = new CartaoCredito();
    }
}