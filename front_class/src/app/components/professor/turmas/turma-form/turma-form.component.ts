import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurmaService } from '../../../../services/turma.service';
import { ProfessorService } from '../../../../services/professor.service';

@Component({
  selector: 'app-turma-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.scss']
})
export class TurmaFormComponent implements OnInit {
  nome = ''; descricao = ''; status = 'Ativa';
  professor_id: number | null = null; professores: any[] = [];
  editando = false; id = 0;

  constructor(
    private turmaService: TurmaService, private professorService: ProfessorService,
    private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.professorService.getAll().subscribe({ next: (d) => this.professores = d });
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editando = true; this.id = +idParam;
      this.turmaService.getById(this.id).subscribe({ next: (data) => {
        this.nome = data.nome; this.descricao = data.descricao || '';
        this.status = data.status; this.professor_id = data.professor_id || null;
      }});
    }
  }

  salvar(): void {
    if (!this.nome) return;
    const payload: any = { nome: this.nome, descricao: this.descricao, status: this.status, professor_id: this.professor_id ?? undefined };
    const action = this.editando ? this.turmaService.update(this.id, payload) : this.turmaService.create(payload);
    action.subscribe({ next: () => this.voltar() });
  }

  voltar(): void { this.router.navigate(['/professor/turmas']); }
}
