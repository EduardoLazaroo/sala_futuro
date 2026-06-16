import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplinaService } from '../../../services/disciplina.service';

@Component({
  selector: 'app-disciplinas-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disciplinas-aluno.component.html',
  styleUrls: ['./disciplinas-aluno.component.scss']
})
export class DisciplinasAlunoComponent implements OnInit {
  disciplinas: any[] = [];

  constructor(
    private disciplinaService: DisciplinaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.disciplinaService.getAll().subscribe(data => {
      this.disciplinas = data;
      this.cdr.detectChanges();
    });
  }
}
