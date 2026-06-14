import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'sala_futuro_user';

  constructor() {}

  setUser(user: any, tipo: string): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify({ user, tipo }));
  }

  getUser(): any {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  getTipo(): string {
    const data = this.getUser();
    return data ? data.tipo : '';
  }

  getUserId(): number {
    const data = this.getUser();
    return data ? data.user.id : 0;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  isAluno(): boolean {
    return this.getTipo() === 'aluno';
  }

  isProfessor(): boolean {
    return this.getTipo() === 'professor';
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}
