import { Endereco } from './endereco';
import { CartaoCredito } from './cartao-credito';
import { ResumoServico } from './resumo-servico';

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
    ultimosServicos: Array<ResumoServico>;

    constructor() {
        this.endereco = new Endereco();
        this.cartaoCredito = new CartaoCredito();
        this.ultimosServicos = new Array<ResumoServico>();
    }

}