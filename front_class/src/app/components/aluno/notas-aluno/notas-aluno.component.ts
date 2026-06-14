import { Component, OnInit } from '@angular/core';
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
  constructor(private notaService: NotaService, private authService: AuthService) {}
  ngOnInit(): void {
    this.notaService.getAll(undefined, this.authService.getUserId()).subscribe({ next: (d) => this.notas = d });
  }
}
