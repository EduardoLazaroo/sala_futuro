import { Component, OnInit } from '@angular/core';
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

  constructor(private materialService: MaterialService, private router: Router) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.materialService.getAll().subscribe({ next: (data) => this.materiais = data });
  }

  novo(): void { this.router.navigate(['/professor/materiais/novo']); }
  editar(id: number): void { this.router.navigate([`/professor/materiais/editar/${id}`]); }
  excluir(id: number): void {
    if (confirm('Deseja excluir este material?')) {
      this.materialService.delete(id).subscribe({ next: () => this.carregar() });
    }
  }
}
