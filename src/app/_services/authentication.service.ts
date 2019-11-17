import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Login } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(login: Login) {
    return this.http.post<Login>(`${environment.apiBaseUrl}/api/v1/authentication/login`, login);
  }

}
