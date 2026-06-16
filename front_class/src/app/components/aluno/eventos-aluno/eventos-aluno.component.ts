import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoService } from '../../../services/evento.service';

@Component({
  selector: 'app-eventos-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos-aluno.component.html',
  styleUrls: ['./eventos-aluno.component.scss']
})
export class EventosAlunoComponent implements OnInit {
  eventos: any[] = [];

  constructor(
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.eventoService.getAll().subscribe(data => {
      this.eventos = data;
      this.cdr.detectChanges();
    });
  }
}
