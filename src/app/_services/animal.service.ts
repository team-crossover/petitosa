import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Animal, NovoAnimal } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) { }

  createAnimal(idDono: number, animal: NovoAnimal) {
    return this.http.post<NovoAnimal>(`${environment.apiBaseUrl}api/v1/animais?idDono=${idDono}`, animal);
  }

  getAnimals(idDono: number) {
    return this.http.get<Animal[]>(`${environment.apiBaseUrl}api/v1/animais?idDono=${idDono}`);
  }

  getAnimal(id: number) {
    return this.http.get<Animal>(`${environment.apiBaseUrl}api/v1/animal/${id}`);
  }

  updateAnimal(id: number, animal: NovoAnimal) {
    return this.http.post<NovoAnimal>(`${environment.apiBaseUrl}api/v1/animal/${id}`, animal);
  }

  removeAnimal(id: number) {
    return this.http.delete(`${environment.apiBaseUrl}api/v1/animal/${id}`);
  }

}
