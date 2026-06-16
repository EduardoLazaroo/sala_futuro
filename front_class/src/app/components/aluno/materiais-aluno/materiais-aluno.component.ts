import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialService } from '../../../services/material.service';

@Component({
  selector: 'app-materiais-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materiais-aluno.component.html',
  styleUrls: ['./materiais-aluno.component.scss']
})
export class MateriaisAlunoComponent implements OnInit {
  materiais: any[] = [];

  constructor(
    private materialService: MaterialService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.materialService.getAll().subscribe(data => {
      this.materiais = data;
      this.cdr.detectChanges();
    });
  }
}
