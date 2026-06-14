export interface Frequencia {
  id?: number;
  aluno_id: number;
  turma_id: number;
  data: string;
  presente: boolean;
  aluno_nome?: string;
  ra?: string;
  turma_nome?: string;
  created_at?: string;
}
