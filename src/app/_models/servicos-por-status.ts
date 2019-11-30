import { Servico } from './servico';

export class ServicosPorStatus {
    aceitos: Array<Servico>;
    desistidos: Array<Servico>;
    emAndamento: Array<Servico>;
    pendentes: Array<Servico>;
    rejeitados: Array<Servico>;
    terminados: Array<Servico>;

    constructor() {
        this.aceitos = new Array<Servico>();
        this.desistidos = new Array<Servico>();
        this.emAndamento = new Array<Servico>();
        this.pendentes = new Array<Servico>();
        this.rejeitados = new Array<Servico>();
        this.terminados = new Array<Servico>();
    }
}