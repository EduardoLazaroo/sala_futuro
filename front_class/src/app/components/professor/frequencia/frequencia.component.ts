import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FrequenciaService } from '../../../services/frequencia.service';
import { TurmaService } from '../../../services/turma.service';

@Component({
  selector: 'app-frequencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './frequencia.component.html',
  styleUrls: ['./frequencia.component.scss']
})
export class FrequenciaComponent implements OnInit {
  turmaId = 0;
  turma: any = {};
  alunos: any[] = [];
  frequencias: any[] = [];
  data = '';

  constructor(
    private frequenciaService: FrequenciaService, private turmaService: TurmaService,
    private router: Router, private route: ActivatedRoute
  ) {
    this.turmaId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.turmaService.getById(this.turmaId).subscribe({ next: (d) => this.turma = d });
    this.turmaService.getAlunos(this.turmaId).subscribe({ next: (d) => this.alunos = d });
    this.carregar();
  }

  carregar(): void {
    this.turmaService.getFrequencia(this.turmaId).subscribe({
      next: (d) => {
        console.log('Frequências carregadas:', d);
        this.frequencias = d;
      },
      error: (err) => {
        console.error('Erro ao carregar frequências:', err);
        alert('Erro ao carregar frequências. Verifique se o backend está rodando.');
      }
    });
  }

  registrarPresenca(alunoId: number, presente: boolean): void {
    if (!this.data) { alert('Selecione uma data'); return; }
    const payload = { aluno_id: alunoId, turma_id: this.turmaId, data: this.data, presente };
    this.frequenciaService.create(payload).subscribe({
      next: () => this.carregar(),
      error: () => { /* pode já existir, tenta atualizar */ }
    });
  }

  getFrequenciaAluno(alunoId: number): any {
    return this.frequencias.find(f => f.aluno_id === alunoId && f.data === this.data);
  }

  togglePresenca(alunoId: number): void {
    if (!this.data) { alert('Selecione uma data'); return; }
    const freq = this.getFrequenciaAluno(alunoId);
    if (freq) {
      this.frequenciaService.update(freq.id, { ...freq, presente: !freq.presente }).subscribe({ next: () => this.carregar() });
    } else {
      this.registrarPresenca(alunoId, true);
    }
  }

  voltar(): void { this.router.navigate(['/professor/turmas']); }
}
