export interface Disciplina {
  id?: number;
  nome: string;
  descricao?: string;
  carga_horaria: number;
  status: 'Ativa' | 'Inativa';
  professor_id?: number;
  professor_nome?: string;
  created_at?: string;
}
