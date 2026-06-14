export interface Material {
  id?: number;
  titulo: string;
  descricao?: string;
  arquivo_ou_link?: string;
  data_publicacao: string;
  professor_id?: number;
  professor_nome?: string;
  disciplina_id?: number;
  disciplina_nome?: string;
  created_at?: string;
}
