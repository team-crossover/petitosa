import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FiltroServico, PrestadorEncontrado } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }

  searchPrestadores(filtroServico: FiltroServico) {
    return this.http.post<PrestadorEncontrado[]>(`${environment.apiBaseUrl}api/v1/servicos`, filtroServico);
  }

}
