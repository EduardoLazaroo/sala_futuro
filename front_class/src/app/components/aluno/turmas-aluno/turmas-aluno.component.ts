import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurmaService } from '../../../services/turma.service';

@Component({
  selector: 'app-turmas-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turmas-aluno.component.html',
  styleUrls: ['./turmas-aluno.component.scss']
})
export class TurmasAlunoComponent implements OnInit {
  turmas: any[] = [];
  constructor(private turmaService: TurmaService) {}
  ngOnInit(): void { this.turmaService.getAll().subscribe({ next: (d) => this.turmas = d }); }
}
