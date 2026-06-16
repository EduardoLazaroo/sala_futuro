import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  loading = true;

  constructor(
    private turmaService: TurmaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.turmaService.getAll().subscribe(data => {
      this.turmas = data;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  novo(): void {
    this.router.navigate(['/professor/turmas/novo']);
  }

  editar(id: number): void {
    this.router.navigate(['/professor/turmas/editar', id]);
  }

  excluir(id: number): void {
    if (confirm('Excluir esta turma?')) {
      this.turmaService.delete(id).subscribe(() => this.ngOnInit());
    }
  }

  verAlunos(id: number): void {
    this.router.navigate(['/professor/turmas', id, 'alunos']);
  }

  verNotas(id: number): void {
    this.router.navigate(['/professor/turmas', id, 'notas']);
  }

  verFrequencia(id: number): void {
    this.router.navigate(['/professor/turmas', id, 'frequencia']);
  }
}
