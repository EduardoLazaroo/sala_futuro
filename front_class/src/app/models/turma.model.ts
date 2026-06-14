export interface Turma {
  id?: number;
  nome: string;
  descricao?: string;
  status: 'Ativa' | 'Inativa';
  professor_id?: number;
  professor_nome?: string;
  total_alunos?: number;
  created_at?: string;
}
