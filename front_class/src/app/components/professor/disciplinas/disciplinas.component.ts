import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DisciplinaService } from '../../../services/disciplina.service';

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.scss']
})
export class DisciplinasComponent implements OnInit {
  disciplinas: any[] = [];
  loading = true;

  constructor(
    private disciplinaService: DisciplinaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.disciplinaService.getAll().subscribe(data => {
      this.disciplinas = data;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  novo(): void {
    this.router.navigate(['/professor/disciplinas/novo']);
  }

  editar(id: number): void {
    this.router.navigate(['/professor/disciplinas/editar', id]);
  }

  excluir(id: number): void {
    if (confirm('Excluir esta disciplina?')) {
      this.disciplinaService.delete(id).subscribe(() => this.ngOnInit());
    }
  }
}
