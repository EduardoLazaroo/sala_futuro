import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisciplinaService } from '../../../../services/disciplina.service';
import { ProfessorService } from '../../../../services/professor.service';

@Component({
  selector: 'app-disciplina-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './disciplina-form.component.html',
  styleUrls: ['./disciplina-form.component.scss']
})
export class DisciplinaFormComponent implements OnInit {
  nome = ''; descricao = ''; carga_horaria: number | null = null; status = 'Ativa';
  professor_id: number | null = null; professores: any[] = [];
  editando = false; id = 0;

  constructor(
    private disciplinaService: DisciplinaService, private professorService: ProfessorService,
    private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.professorService.getAll().subscribe({ next: (d) => this.professores = d });
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editando = true; this.id = +idParam;
      this.disciplinaService.getById(this.id).subscribe({ next: (data) => {
        this.nome = data.nome; this.descricao = data.descricao || '';
        this.carga_horaria = data.carga_horaria; this.status = data.status;
        this.professor_id = data.professor_id || null;
      }});
    }
  }

  salvar(): void {
    if (!this.nome || !this.carga_horaria) return;
    const payload: any = { nome: this.nome, descricao: this.descricao, carga_horaria: this.carga_horaria,
      status: this.status, professor_id: this.professor_id ?? undefined };
    const action = this.editando ? this.disciplinaService.update(this.id, payload) : this.disciplinaService.create(payload);
    action.subscribe({ next: () => this.voltar() });
  }

  voltar(): void { this.router.navigate(['/professor/disciplinas']); }
}
