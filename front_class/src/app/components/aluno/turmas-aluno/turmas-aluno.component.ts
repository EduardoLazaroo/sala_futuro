import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private turmaService: TurmaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.turmaService.getAll().subscribe(data => {
      this.turmas = data;
      this.cdr.detectChanges();
    });
  }
}
