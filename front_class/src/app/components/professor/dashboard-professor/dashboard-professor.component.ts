import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../services/dashboard.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-professor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-professor.component.html',
  styleUrls: ['./dashboard-professor.component.scss']
})
export class DashboardProfessorComponent implements OnInit {
  dashboard: any = { total_turmas: 0, total_alunos: 0, total_disciplinas: 0, proximos_eventos: [] };

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    this.dashboardService.getProfessorDashboard(id).subscribe({
      next: (data) => this.dashboard = data,
      error: (err) => console.error(err)
    });
  }
}
