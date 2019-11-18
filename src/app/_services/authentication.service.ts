import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  login(login: Login): Observable<Login> {
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<Login>(`${environment.apiBaseUrl}api/v1/authentication/login`, login, requestOptions);
  }

}
