import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Prestador, NovoPrestador } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {

  constructor(private http: HttpClient) { }

  createPrestador(novoPrestador: NovoPrestador) {
    return this.http.post<Prestador>(`${environment.apiBaseUrl}api/v1/prestadores`, novoPrestador);
  }

  getPrestador(id: number) {
    return this.http.get<Prestador>(`${environment.apiBaseUrl}api/v1/prestador/${id}`);
  }

  updatePrestador(id: number, novoPrestador: NovoPrestador) {
    return this.http.post<Prestador>(`${environment.apiBaseUrl}api/v1/prestador/${id}`, novoPrestador);
  }

}
