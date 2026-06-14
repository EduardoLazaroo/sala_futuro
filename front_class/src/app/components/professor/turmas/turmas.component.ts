import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TurmaService } from '../../../services/turma.service';

@Component({
  selector: 'app-turmas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss']
})
export class TurmasComponent implements OnInit {
  turmas: any[] = [];
  constructor(private turmaService: TurmaService, private router: Router) {}
  ngOnInit(): void { this.carregar(); }
  carregar(): void { this.turmaService.getAll().subscribe({ next: (d) => this.turmas = d }); }
  novo(): void { this.router.navigate(['/professor/turmas/novo']); }
  editar(id: number): void { this.router.navigate([`/professor/turmas/editar/${id}`]); }
  excluir(id: number): void { if (confirm('Excluir esta turma?')) this.turmaService.delete(id).subscribe({ next: () => this.carregar() }); }
  verAlunos(id: number): void { this.router.navigate([`/professor/turmas/${id}/alunos`]); }
  verNotas(id: number): void { this.router.navigate([`/professor/turmas/${id}/notas`]); }
  verFrequencia(id: number): void { this.router.navigate([`/professor/turmas/${id}/frequencia`]); }
}
