import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlunoService } from '../../../services/aluno.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-aluno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-aluno.component.html',
  styleUrls: ['./login-aluno.component.scss']
})
export class LoginAlunoComponent {
  ra = '';
  senha = '';
  erro = '';
  tipo = '';

  constructor(
    private alunoService: AlunoService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tipo = this.route.snapshot.paramMap.get('tipo') || 'aluno';
  }

  voltar(): void {
    this.router.navigate(['/']);
  }

  irParaCadastro(): void {
    this.router.navigate(['/cadastro/aluno']);
  }

  login(): void {
    this.erro = '';
    if (!this.ra || !this.senha) {
      this.erro = 'Preencha todos os campos';
      return;
    }

    this.alunoService.login(this.ra, this.senha).subscribe({
      next: (res) => {
        this.authService.setUser(res.user, 'aluno');
        this.router.navigate(['/aluno/dashboard']);
      },
      error: (err) => {
        this.erro = err.error?.error || 'Erro ao fazer login';
      }
    });
  }
}
