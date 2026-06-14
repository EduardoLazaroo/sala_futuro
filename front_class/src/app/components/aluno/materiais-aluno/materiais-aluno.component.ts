import { Component, OnInit } from '@angular/core';
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
  constructor(private materialService: MaterialService) {}
  ngOnInit(): void { this.materialService.getAll().subscribe({ next: (d) => this.materiais = d }); }
}
