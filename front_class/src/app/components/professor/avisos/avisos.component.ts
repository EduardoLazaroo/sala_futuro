import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AvisoService } from '../../../services/aviso.service';

@Component({
  selector: 'app-avisos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss']
})
export class AvisosComponent implements OnInit {
  avisos: any[] = [];
  constructor(private avisoService: AvisoService, private router: Router) {}
  ngOnInit(): void { this.carregar(); }
  carregar(): void { this.avisoService.getAll().subscribe({ next: (d) => this.avisos = d }); }
  novo(): void { this.router.navigate(['/professor/avisos/novo']); }
  editar(id: number): void { this.router.navigate([`/professor/avisos/editar/${id}`]); }
  excluir(id: number): void { if (confirm('Excluir este aviso?')) this.avisoService.delete(id).subscribe({ next: () => this.carregar() }); }
}
