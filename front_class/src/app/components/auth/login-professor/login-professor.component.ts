import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../../services/professor.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-professor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-professor.component.html',
  styleUrls: ['./login-professor.component.scss']
})
export class LoginProfessorComponent {
  cpf = '';
  senha = '';
  erro = '';

  constructor(
    private professorService: ProfessorService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  voltar(): void {
    this.router.navigate(['/']);
  }

  irParaCadastro(): void {
    this.router.navigate(['/cadastro/professor']);
  }

  login(): void {
    this.erro = '';
    if (!this.cpf || !this.senha) {
      this.erro = 'Preencha todos os campos';
      return;
    }

    this.professorService.login(this.cpf, this.senha).subscribe({
      next: (res) => {
        this.authService.setUser(res.user, 'professor');
        this.router.navigate(['/professor/dashboard']);
      },
      error: (err) => {
        this.erro = err.error?.error || 'Erro ao fazer login';
      }
    });
  }
}
