import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvisoService } from '../../../../services/aviso.service';
import { TurmaService } from '../../../../services/turma.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-aviso-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aviso-form.component.html',
  styleUrls: ['./aviso-form.component.scss']
})
export class AvisoFormComponent implements OnInit {
  titulo = ''; conteudo = ''; data_publicacao = '';
  turmas: any[] = []; turmasSelecionadas: number[] = [];
  editando = false; id = 0;

  constructor(
    private avisoService: AvisoService, private turmaService: TurmaService,
    private authService: AuthService, private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.turmaService.getAll().subscribe({ next: (d) => this.turmas = d });
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editando = true; this.id = +idParam;
      this.avisoService.getById(this.id).subscribe({ next: (data) => {
        this.titulo = data.titulo; this.conteudo = data.conteudo; this.data_publicacao = data.data_publicacao;
      }});
    }
  }

  toggleTurma(turmaId: number): void {
    const idx = this.turmasSelecionadas.indexOf(turmaId);
    if (idx > -1) this.turmasSelecionadas.splice(idx, 1);
    else this.turmasSelecionadas.push(turmaId);
  }

  salvar(): void {
    if (!this.titulo || !this.conteudo || !this.data_publicacao) return;
    const payload: any = { titulo: this.titulo, conteudo: this.conteudo, data_publicacao: this.data_publicacao,
      professor_id: this.authService.getUserId(), turmas: this.turmasSelecionadas };
    const action = this.editando ? this.avisoService.update(this.id, payload) : this.avisoService.create(payload);
    action.subscribe({ next: () => this.voltar() });
  }

  voltar(): void { this.router.navigate(['/professor/avisos']); }
}
