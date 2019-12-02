import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartaoCredito, ContaBancaria } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  constructor(private http: HttpClient) { }

  validateCartao(cartao: CartaoCredito): Observable<CartaoCredito> {
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<CartaoCredito>(`${environment.apiBaseUrl}api/v1/money/cartao/validar`, cartao, requestOptions);
  }

  validateConta(conta: ContaBancaria): Observable<ContaBancaria> {
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<ContaBancaria>(`${environment.apiBaseUrl}api/v1/money/conta/validar`, conta, requestOptions);
  }

}
