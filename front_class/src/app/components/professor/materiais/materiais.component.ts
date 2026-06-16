import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialService } from '../../../services/material.service';

@Component({
  selector: 'app-materiais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materiais.component.html',
  styleUrls: ['./materiais.component.scss']
})
export class MateriaisComponent implements OnInit {
  materiais: any[] = [];
  loading = true;

  constructor(
    private materialService: MaterialService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit chamado');
    this.loading = true;
    console.log('Chamando materialService.getAll()...');
    this.materialService.getAll().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
        this.materiais = data;
        this.loading = false;
        this.cdr.detectChanges();
        console.log('loading = false - detectChanges chamado');
      },
      error: (err) => {
        console.error('Erro ao carregar materiais:', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('Subscribe completo');
      }
    });
  }

  novo(): void {
    this.router.navigate(['/professor/materiais/novo']);
  }

  editar(id: number): void {
    this.router.navigate(['/professor/materiais/editar', id]);
  }

  excluir(id: number): void {
    if (confirm('Deseja excluir este material?')) {
      this.materialService.delete(id).subscribe(() => this.ngOnInit());
    }
  }
}
