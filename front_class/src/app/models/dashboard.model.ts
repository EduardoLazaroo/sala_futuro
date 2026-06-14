export interface ProfessorDashboard {
  total_turmas: number;
  total_alunos: number;
  total_disciplinas: number;
  proximos_eventos: any[];
}

export interface AlunoDashboard {
  total_turmas: number;
  total_disciplinas: number;
  disciplinas: any[];
  proximos_eventos: any[];
  ultimos_avisos: any[];
}
