import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventoService } from '../../../services/evento.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  eventos: any[] = [];

  constructor(
    private eventoService: EventoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.eventoService.getAll().subscribe(data => {
      this.eventos = data;
      this.cdr.detectChanges();
    });
  }

  novo(): void {
    this.router.navigate(['/professor/eventos/novo']);
  }

  editar(id: number): void {
    this.router.navigate(['/professor/eventos/editar', id]);
  }

  excluir(id: number): void {
    if (confirm('Deseja excluir este evento?')) {
      this.eventoService.delete(id).subscribe(() => this.ngOnInit());
    }
  }
}
