import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../../services/professor.service';

@Component({
  selector: 'app-cadastro-professor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.scss']
})
export class CadastroProfessorComponent {
  nome = '';
  email = '';
  cpf = '';
  senha = '';
  confirmarSenha = '';
  erro = '';
  sucesso = '';

  constructor(
    private professorService: ProfessorService,
    private router: Router
  ) {}

  voltar(): void {
    this.router.navigate(['/']);
  }

  irParaLogin(): void {
    this.router.navigate(['/login/professor']);
  }

  cadastrar(): void {
    this.erro = '';
    this.sucesso = '';

    if (!this.nome || !this.email || !this.cpf || !this.senha || !this.confirmarSenha) {
      this.erro = 'Preencha todos os campos';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem';
      return;
    }

    this.professorService.register({
      nome: this.nome,
      email: this.email,
      cpf: this.cpf,
      senha: this.senha
    }).subscribe({
      next: () => {
        this.sucesso = 'Cadastro realizado com sucesso! Redirecionando...';
        setTimeout(() => this.router.navigate(['/login/professor']), 1500);
      },
      error: (err: any) => {
        this.erro = err.error?.error || 'Erro ao cadastrar';
      }
    });
  }
}
