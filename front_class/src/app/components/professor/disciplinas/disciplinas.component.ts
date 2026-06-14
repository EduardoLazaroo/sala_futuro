import { Component, OnInit } from '@angular/core';
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
  constructor(private disciplinaService: DisciplinaService, private router: Router) {}
  ngOnInit(): void { this.carregar(); }
  carregar(): void { this.disciplinaService.getAll().subscribe({ next: (d) => this.disciplinas = d }); }
  novo(): void { this.router.navigate(['/professor/disciplinas/novo']); }
  editar(id: number): void { this.router.navigate([`/professor/disciplinas/editar/${id}`]); }
  excluir(id: number): void { if (confirm('Excluir esta disciplina?')) this.disciplinaService.delete(id).subscribe({ next: () => this.carregar() }); }
}
