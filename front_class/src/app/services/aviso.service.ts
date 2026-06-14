import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aviso } from '../models/aviso.model';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private apiUrl = 'http://localhost:3000/avisos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Aviso[]> {
    return this.http.get<Aviso[]>(this.apiUrl);
  }

  getById(id: number): Observable<Aviso> {
    return this.http.get<Aviso>(`${this.apiUrl}/${id}`);
  }

  create(aviso: Aviso): Observable<any> {
    return this.http.post(this.apiUrl, aviso);
  }

  update(id: number, aviso: Aviso): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, aviso);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
