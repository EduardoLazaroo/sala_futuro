import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.scss']
})
export class CadastroAlunoComponent {
  nome = '';
  email = '';
  ra = '';
  senha = '';
  confirmarSenha = '';
  erro = '';
  sucesso = '';

  constructor(
    private alunoService: AlunoService,
    private router: Router
  ) {}

  voltar(): void {
    this.router.navigate(['/']);
  }

  irParaLogin(): void {
    this.router.navigate(['/login/aluno']);
  }

  cadastrar(): void {
    this.erro = '';
    this.sucesso = '';

    if (!this.nome || !this.email || !this.ra || !this.senha || !this.confirmarSenha) {
      this.erro = 'Preencha todos os campos';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem';
      return;
    }

    this.alunoService.register({
      nome: this.nome,
      email: this.email,
      ra: this.ra,
      senha: this.senha
    }).subscribe({
      next: () => {
        this.sucesso = 'Cadastro realizado com sucesso! Redirecionando...';
        setTimeout(() => this.router.navigate(['/login/aluno']), 1500);
      },
      error: (err: any) => {
        this.erro = err.error?.error || 'Erro ao cadastrar';
      }
    });
  }
}
