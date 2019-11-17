import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Endereco } from '../_models/';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  getEndereco(cep: number) {
    return this.http.get<Endereco>(`${environment.apiBaseUrl}api/v1/endereco/${cep}`);
  }

}
