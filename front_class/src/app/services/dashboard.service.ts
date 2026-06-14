import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfessorDashboard, AlunoDashboard } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/dashboard';

  constructor(private http: HttpClient) {}

  getProfessorDashboard(professorId: number): Observable<ProfessorDashboard> {
    return this.http.get<ProfessorDashboard>(`${this.apiUrl}/professor/${professorId}`);
  }

  getAlunoDashboard(alunoId: number): Observable<AlunoDashboard> {
    return this.http.get<AlunoDashboard>(`${this.apiUrl}/aluno/${alunoId}`);
  }
}
