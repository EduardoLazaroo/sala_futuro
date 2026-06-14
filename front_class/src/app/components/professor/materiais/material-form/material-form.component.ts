import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialService } from '../../../../services/material.service';
import { DisciplinaService } from '../../../../services/disciplina.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss']
})
export class MaterialFormComponent implements OnInit {
  titulo = ''; descricao = ''; arquivo_ou_link = ''; data_publicacao = ''; disciplina_id: number | null = null;
  disciplinas: any[] = []; editando = false; id = 0;

  constructor(
    private materialService: MaterialService, private disciplinaService: DisciplinaService,
    private authService: AuthService, private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.disciplinaService.getAll().subscribe({ next: (d) => this.disciplinas = d });
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editando = true; this.id = +idParam;
      this.materialService.getById(this.id).subscribe({ next: (data) => {
        this.titulo = data.titulo; this.descricao = data.descricao || '';
        this.arquivo_ou_link = data.arquivo_ou_link || ''; this.data_publicacao = data.data_publicacao;
        this.disciplina_id = data.disciplina_id || null;
      }});
    }
  }

  salvar(): void {
    if (!this.titulo || !this.data_publicacao) return;
    const payload: any = { titulo: this.titulo, descricao: this.descricao, arquivo_ou_link: this.arquivo_ou_link,
      data_publicacao: this.data_publicacao, professor_id: this.authService.getUserId(), disciplina_id: this.disciplina_id ?? undefined };
    const action = this.editando ? this.materialService.update(this.id, payload) : this.materialService.create(payload);
    action.subscribe({ next: () => this.voltar() });
  }

  voltar(): void { this.router.navigate(['/professor/materiais']); }
}
