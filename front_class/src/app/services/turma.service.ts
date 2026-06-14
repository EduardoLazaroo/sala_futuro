import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from '../models/turma.model';
import { Aluno } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private apiUrl = 'http://localhost:3000/turmas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.apiUrl);
  }

  getById(id: number): Observable<Turma> {
    return this.http.get<Turma>(`${this.apiUrl}/${id}`);
  }

  create(turma: Turma): Observable<any> {
    return this.http.post(this.apiUrl, turma);
  }

  update(id: number, turma: Turma): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, turma);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAlunos(turmaId: number): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/${turmaId}/alunos`);
  }

  addAluno(turmaId: number, alunoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${turmaId}/alunos`, { aluno_id: alunoId });
  }

  removeAluno(turmaId: number, alunoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${turmaId}/alunos/${alunoId}`);
  }

  getAvisos(turmaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${turmaId}/avisos`);
  }

  getFrequencia(turmaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${turmaId}/frequencia`);
  }
}
