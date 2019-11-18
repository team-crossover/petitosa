import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Login, Usuario } from '../_models';
import { PrestadorService } from './prestador.service';
import { ContratanteService } from './contratante.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(
    private http: HttpClient,
    private prestadorService: PrestadorService,
    private contratanteService: ContratanteService
  ) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  /**
   * Tenta obter o usuário autenticado atualmente, caso ele seja um prestador.
   */
  public getCurrentUserPrestador() {
    const usuario = this.currentUserValue;
    if (usuario && usuario.role == 'PRESTADOR') {
      return this.prestadorService.getPrestador(usuario.idPrestador);
    }
  }

  /**
   * Tenta obter o usuário autenticado atualmente, caso ele seja um contratante.
   */
  public getCurrentUserContratante() {
    const usuario = this.currentUserValue;
    if (usuario && usuario.role == 'CONTRATANTE') {
      return this.contratanteService.getContratante(usuario.idContratante);
    }
  }  

  login(login: Login) {
    return this.http.post<Usuario>(`${environment.apiBaseUrl}api/v1/authentication/login`, login, { observe: 'response' })
        .pipe(map(response => {
          if (response) {
            const usuario = response.body;
            if (usuario && response.status && response.status == 200) {
              localStorage.setItem('currentUser', JSON.stringify(usuario));
              this.currentUserSubject.next(usuario);
            }
          }
          return response;
        }));
  }

  logout() {
    if (this.currentUserSubject) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
  }

}
