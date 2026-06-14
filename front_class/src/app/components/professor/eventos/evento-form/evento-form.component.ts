import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../../../services/evento.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.scss']
})
export class EventoFormComponent implements OnInit {
  titulo = '';
  descricao = '';
  data = '';
  horario = '';
  status = 'Agendado';
  editando = false;
  id = 0;

  statuses = ['Agendado', 'Em andamento', 'Finalizado', 'Cancelado'];

  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editando = true;
      this.id = +idParam;
      this.eventoService.getById(this.id).subscribe({
        next: (data) => {
          this.titulo = data.titulo;
          this.descricao = data.descricao || '';
          this.data = data.data;
          this.horario = data.horario || '';
          this.status = data.status;
        }
      });
    }
  }

  salvar(): void {
    if (!this.titulo || !this.data) return;

    const payload: any = {
      titulo: this.titulo,
      descricao: this.descricao,
      data: this.data,
      horario: this.horario,
      status: this.status,
      professor_id: this.authService.getUserId()
    };

    if (this.editando) {
      this.eventoService.update(this.id, payload).subscribe({ next: () => this.voltar() });
    } else {
      this.eventoService.create(payload).subscribe({ next: () => this.voltar() });
    }
  }

  voltar(): void {
    this.router.navigate(['/professor/eventos']);
  }
}
