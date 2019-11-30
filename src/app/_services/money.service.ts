import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CartaoCredito, ContaBancaria } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  constructor(private http: HttpClient) { }

  validateCartao(cartao: CartaoCredito) {
    this.http.post<CartaoCredito>(`${environment.apiBaseUrl}api/v1/money/cartao/validar`, cartao);
  }

  validateConta(conta: ContaBancaria) {
    this.http.post<ContaBancaria>(`${environment.apiBaseUrl}api/v1/money/conta/validar`, conta);
  }

}
