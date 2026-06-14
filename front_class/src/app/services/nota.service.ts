import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nota } from '../models/nota.model';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private apiUrl = 'http://localhost:3000/notas';

  constructor(private http: HttpClient) {}

  getAll(turmaId?: number, alunoId?: number): Observable<Nota[]> {
    let url = this.apiUrl;
    const params: string[] = [];
    if (turmaId) params.push(`turma_id=${turmaId}`);
    if (alunoId) params.push(`aluno_id=${alunoId}`);
    if (params.length) url += '?' + params.join('&');
    return this.http.get<Nota[]>(url);
  }

  getById(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.apiUrl}/${id}`);
  }

  create(nota: Nota): Observable<any> {
    return this.http.post(this.apiUrl, nota);
  }

  update(id: number, nota: Nota): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, nota);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
