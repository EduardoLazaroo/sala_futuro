import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisoService } from '../../../services/aviso.service';

@Component({
  selector: 'app-avisos-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avisos-aluno.component.html',
  styleUrls: ['./avisos-aluno.component.scss']
})
export class AvisosAlunoComponent implements OnInit {
  avisos: any[] = [];
  constructor(private avisoService: AvisoService) {}
  ngOnInit(): void { this.avisoService.getAll().subscribe({ next: (d) => this.avisos = d }); }
}
