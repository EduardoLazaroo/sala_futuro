import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurmaService } from '../../../../services/turma.service';
import { AlunoService } from '../../../../services/aluno.service';

@Component({
  selector: 'app-turma-alunos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './turma-alunos.component.html',
  styleUrls: ['./turma-alunos.component.scss']
})
export class TurmaAlunosComponent implements OnInit {
  turmaId = 0;
  turma: any = {};
  alunosMatriculados: any[] = [];
  alunosDisponiveis: any[] = [];
  filtro = '';

  constructor(
    private turmaService: TurmaService, private alunoService: AlunoService,
    private router: Router, private route: ActivatedRoute
  ) {
    this.turmaId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.turmaService.getById(this.turmaId).subscribe({ next: (d) => this.turma = d });
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.turmaService.getAlunos(this.turmaId).subscribe({ next: (d) => this.alunosMatriculados = d });
    this.alunoService.getAll().subscribe({ next: (d) => {
      this.alunosDisponiveis = d.filter((a: any) => !this.alunosMatriculados.find((m: any) => m.id === a.id));
    }});
  }

  adicionar(alunoId: number): void {
    this.turmaService.addAluno(this.turmaId, alunoId).subscribe({ next: () => this.carregarAlunos() });
  }

  remover(alunoId: number): void {
    this.turmaService.removeAluno(this.turmaId, alunoId).subscribe({ next: () => this.carregarAlunos() });
  }

  get alunosFiltrados(): any[] {
    if (!this.filtro) return this.alunosDisponiveis;
    const f = this.filtro.toLowerCase();
    return this.alunosDisponiveis.filter((a: any) => a.nome.toLowerCase().includes(f) || a.ra.includes(f));
  }

  voltar(): void { this.router.navigate(['/professor/turmas']); }
}
