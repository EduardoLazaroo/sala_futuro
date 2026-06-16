import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotaService } from '../../../services/nota.service';
import { TurmaService } from '../../../services/turma.service';
import { DisciplinaService } from '../../../services/disciplina.service';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {
  turmaId = 0;
  turma: any = {};
  notas: any[] = [];
  alunos: any[] = [];
  disciplinas: any[] = [];

  // Form
  aluno_id: number | null = null;
  disciplina_id: number | null = null;
  valor: number | null = null;
  observacao = '';
  editando = false;
  editId = 0;

  constructor(
    private notaService: NotaService, private turmaService: TurmaService,
    private disciplinaService: DisciplinaService, private router: Router, private route: ActivatedRoute
  ) {
    this.turmaId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.turmaService.getById(this.turmaId).subscribe({ next: (d) => this.turma = d });
    this.turmaService.getAlunos(this.turmaId).subscribe({ next: (d) => this.alunos = d });
    this.disciplinaService.getAll().subscribe({ next: (d) => this.disciplinas = d });
    this.carregar();
  }

  carregar(): void {
    this.notaService.getAll(this.turmaId).subscribe({
      next: (d) => {
        console.log('Notas carregadas:', d);
        this.notas = d;
      },
      error: (err) => {
        console.error('Erro ao carregar notas:', err);
        alert('Erro ao carregar notas. Verifique se o backend está rodando.');
      }
    });
  }

  salvar(): void {
    if (!this.aluno_id || !this.disciplina_id || this.valor === null) return;
    const payload: any = { aluno_id: this.aluno_id, turma_id: this.turmaId, disciplina_id: this.disciplina_id, valor: this.valor, observacao: this.observacao };
    if (this.editando) {
      this.notaService.update(this.editId, payload).subscribe({ next: () => { this.limpar(); this.carregar(); } });
    } else {
      this.notaService.create(payload).subscribe({ next: () => { this.limpar(); this.carregar(); } });
    }
  }

  editar(nota: any): void {
    this.editando = true; this.editId = nota.id;
    this.aluno_id = nota.aluno_id; this.disciplina_id = nota.disciplina_id;
    this.valor = nota.valor; this.observacao = nota.observacao || '';
  }

  excluir(id: number): void {
    if (confirm('Excluir esta nota?')) this.notaService.delete(id).subscribe({ next: () => this.carregar() });
  }

  limpar(): void {
    this.editando = false; this.editId = 0;
    this.aluno_id = null; this.disciplina_id = null; this.valor = null; this.observacao = '';
  }

  voltar(): void { this.router.navigate(['/professor/turmas']); }
}
