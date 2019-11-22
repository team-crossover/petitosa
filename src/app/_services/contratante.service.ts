import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Contratante, NovoContratante } from '../_models'; 

@Injectable({
  providedIn: 'root'
})
export class ContratanteService {

  constructor(private http: HttpClient) { }

  createContratante(novoContratante: NovoContratante) {
    return this.http.post<NovoContratante>(`${environment.apiBaseUrl}api/v1/contratantes`, novoContratante);
  }

  getContratante(id: number) {
    return this.http.get<Contratante>(`${environment.apiBaseUrl}api/v1/contratante/${id}`);
  }

  getContratantes() {
    return this.http.get<Contratante[]>(`${environment.apiBaseUrl}api/v1/contratantes`); 
  }

  updateContratante(id: number, novoContratante: NovoContratante) {
    return this.http.post<NovoContratante>(`${environment.apiBaseUrl}api/v1/contratante/${id}`, novoContratante);
  }

}
