import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  loading = true;

  constructor(
    private avisoService: AvisoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.avisoService.getAll().subscribe(data => {
      this.avisos = data;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  novo(): void {
    this.router.navigate(['/professor/avisos/novo']);
  }

  editar(id: number): void {
    this.router.navigate(['/professor/avisos/editar', id]);
  }

  excluir(id: number): void {
    if (confirm('Excluir este aviso?')) {
      this.avisoService.delete(id).subscribe(() => this.ngOnInit());
    }
  }
}
