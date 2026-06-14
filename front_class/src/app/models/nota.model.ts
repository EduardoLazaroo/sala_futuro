export interface Nota {
  id?: number;
  aluno_id: number;
  turma_id: number;
  disciplina_id: number;
  valor: number;
  observacao?: string;
  aluno_nome?: string;
  ra?: string;
  turma_nome?: string;
  disciplina_nome?: string;
  created_at?: string;
}
