import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disciplina } from '../models/disciplina.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private apiUrl = 'http://localhost:3000/disciplinas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiUrl);
  }

  getById(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.apiUrl}/${id}`);
  }

  create(disciplina: Disciplina): Observable<any> {
    return this.http.post(this.apiUrl, disciplina);
  }

  update(id: number, disciplina: Disciplina): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, disciplina);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
