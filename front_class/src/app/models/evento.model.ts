export interface Evento {
  id?: number;
  titulo: string;
  descricao?: string;
  data: string;
  horario?: string;
  status: 'Agendado' | 'Em andamento' | 'Finalizado' | 'Cancelado';
  professor_id?: number;
  created_at?: string;
}
