import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Frequencia } from '../models/frequencia.model';

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {
  private apiUrl = 'http://localhost:3000/frequencias';

  constructor(private http: HttpClient) {}

  getAll(turmaId?: number, alunoId?: number): Observable<Frequencia[]> {
    let url = this.apiUrl;
    const params: string[] = [];
    if (turmaId) params.push(`turma_id=${turmaId}`);
    if (alunoId) params.push(`aluno_id=${alunoId}`);
    if (params.length) url += '?' + params.join('&');
    return this.http.get<Frequencia[]>(url);
  }

  create(frequencia: Frequencia): Observable<any> {
    return this.http.post(this.apiUrl, frequencia);
  }

  update(id: number, frequencia: Frequencia): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, frequencia);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
