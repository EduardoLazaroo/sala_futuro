import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrequenciaService } from '../../../services/frequencia.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-frequencia-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frequencia-aluno.component.html',
  styleUrls: ['./frequencia-aluno.component.scss']
})
export class FrequenciaAlunoComponent implements OnInit {
  frequencias: any[] = [];
  constructor(private frequenciaService: FrequenciaService, private authService: AuthService) {}
  ngOnInit(): void {
    this.frequenciaService.getAll(undefined, this.authService.getUserId()).subscribe({ next: (d) => this.frequencias = d });
  }
}
