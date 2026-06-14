import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent {
  tipo = '';
  nome = '';

  itensProfessor = [
    { label: 'Dashboard', icon: '📊', rota: '/professor/dashboard' },
    { label: 'Eventos', icon: '📅', rota: '/professor/eventos' },
    { label: 'Materiais', icon: '📂', rota: '/professor/materiais' },
    { label: 'Avisos', icon: '📢', rota: '/professor/avisos' },
    { label: 'Disciplinas', icon: '📚', rota: '/professor/disciplinas' },
    { label: 'Turmas', icon: '👥', rota: '/professor/turmas' },
  ];

  itensAluno = [
    { label: 'Dashboard', icon: '📊', rota: '/aluno/dashboard' },
    { label: 'Eventos', icon: '📅', rota: '/aluno/eventos' },
    { label: 'Materiais', icon: '📂', rota: '/aluno/materiais' },
    { label: 'Avisos', icon: '📢', rota: '/aluno/avisos' },
    { label: 'Disciplinas', icon: '📚', rota: '/aluno/disciplinas' },
    { label: 'Minhas Turmas', icon: '👥', rota: '/aluno/turmas' },
    { label: 'Minhas Notas', icon: '📝', rota: '/aluno/notas' },
    { label: 'Frequência', icon: '✅', rota: '/aluno/frequencia' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const data = this.authService.getUser();
    if (data) {
      this.tipo = data.tipo;
      this.nome = data.user.nome;
    }
  }

  get itens() {
    return this.tipo === 'professor' ? this.itensProfessor : this.itensAluno;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
