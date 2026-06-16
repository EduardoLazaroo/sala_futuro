import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaService } from '../../../services/nota.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-notas-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notas-aluno.component.html',
  styleUrls: ['./notas-aluno.component.scss']
})
export class NotasAlunoComponent implements OnInit {
  notas: any[] = [];

  constructor(
    private notaService: NotaService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const alunoId = this.authService.getUserId();
    this.notaService.getAll(undefined, alunoId).subscribe(data => {
      this.notas = data;
      this.cdr.detectChanges();
    });
  }
}
