import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private apiUrl = 'http://localhost:3000/professores';

  constructor(private http: HttpClient) {}

  register(professor: Professor): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, professor);
  }

  login(cpf: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { cpf, senha });
  }

  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/${id}`);
  }

  update(id: number, professor: Professor): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, professor);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
