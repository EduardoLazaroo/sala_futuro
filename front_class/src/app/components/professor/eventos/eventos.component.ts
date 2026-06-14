import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventoService } from '../../../services/evento.service';
import { AuthService } from '../../../services/auth.service';

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
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.eventoService.getAll().subscribe({
      next: (data) => this.eventos = data,
      error: (err) => console.error(err)
    });
  }

  novo(): void {
    this.router.navigate(['/professor/eventos/novo']);
  }

  editar(id: number): void {
    this.router.navigate([`/professor/eventos/editar/${id}`]);
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente excluir este evento?')) {
      this.eventoService.delete(id).subscribe({ next: () => this.carregar() });
    }
  }
}
