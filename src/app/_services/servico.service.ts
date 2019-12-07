import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FiltroServico, PrestadorEncontrado, Servico, NovaAvaliacao, SolicitacaoServico, ServicosPorStatus } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }

  getServico(idServico) {
    return this.http.get<Servico>(`${environment.apiBaseUrl}api/v1/servicos/${idServico}`);
  }

  acceptServico(idServico) {
    return this.http.get<Servico>(`${environment.apiBaseUrl}api/v1/servicos/${idServico}/aceitar`);
  }

  rateServico(idServico, avaliacao: NovaAvaliacao) {
    return this.http.post<Servico>(`${environment.apiBaseUrl}api/v1/servicos/${idServico}/avaliar`, avaliacao);
  }

  quitServico(idServico, idUsuario) {
    return this.http.get<Servico>(`${environment.apiBaseUrl}api/v1/servicos/${idServico}/desistir`, { params: { "idUsuario": idUsuario } });
  }

  startServico(idServico) {
    return this.http.get<Servico>(`${environment.apiBaseUrl}api/v1/servicos/${idServico}/iniciar`);
  }

  refuseServico(idServico) {
    return this.http.get<Servico>(`${environment.apiBaseUrl}api/v1/servicos/${idServico}/rejeitar`);
  }

  finishServico(idServico) {
    return this.http.get<Servico>(`${environment.apiBaseUrl}api/v1/servicos/${idServico}/terminar`);
  }

  searchPrestadores(filtroServico: FiltroServico) {
    return this.http.post<PrestadorEncontrado[]>(`${environment.apiBaseUrl}api/v1/servicos/buscar`, filtroServico);
  }

  searchByContratante(idContratante) {
    return this.http.get<ServicosPorStatus>(`${environment.apiBaseUrl}api/v1/servicos/by-contratante/${idContratante}`);
  }

  getByPrestador(idPrestador) {
    return this.http.get<ServicosPorStatus>(`${environment.apiBaseUrl}api/v1/servicos/by-prestador/${idPrestador}`);
  }

  requestServico(solicitacao: SolicitacaoServico) {
    return this.http.post<Servico>(`${environment.apiBaseUrl}api/v1/servicos/solicitar`, solicitacao);
  }

}
