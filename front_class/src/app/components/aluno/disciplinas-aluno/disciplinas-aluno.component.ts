import { Component, OnInit } from '@angular/core';
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
  constructor(private disciplinaService: DisciplinaService) {}
  ngOnInit(): void { this.disciplinaService.getAll().subscribe({ next: (d) => this.disciplinas = d }); }
}
