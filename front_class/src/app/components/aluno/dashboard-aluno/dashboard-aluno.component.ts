import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../services/dashboard.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-aluno.component.html',
  styleUrls: ['./dashboard-aluno.component.scss']
})
export class DashboardAlunoComponent implements OnInit {
  dashboard: any = { total_turmas: 0, total_disciplinas: 0, proximos_eventos: [], ultimos_avisos: [] };

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const alunoId = this.authService.getUserId();
    this.dashboardService.getAlunoDashboard(alunoId).subscribe(data => {
      this.dashboard = data;
      this.cdr.detectChanges();
    });
  }
}
