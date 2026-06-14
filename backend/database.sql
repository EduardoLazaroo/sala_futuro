-- =============================================
-- BANCO DE DADOS: SALA_FUTURO
-- Plataforma Acadêmica Simplificada
-- =============================================

CREATE DATABASE IF NOT EXISTS sala_futuro;
USE sala_futuro;

-- =============================================
-- TABELA: ALUNOS
-- =============================================
CREATE TABLE IF NOT EXISTS alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  ra VARCHAR(20) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABELA: PROFESSORES
-- =============================================
CREATE TABLE IF NOT EXISTS professores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABELA: DISCIPLINAS
-- =============================================
CREATE TABLE IF NOT EXISTS disciplinas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  carga_horaria INT NOT NULL,
  status ENUM('Ativa', 'Inativa') DEFAULT 'Ativa',
  professor_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
);

-- =============================================
-- TABELA: TURMAS
-- =============================================
CREATE TABLE IF NOT EXISTS turmas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  status ENUM('Ativa', 'Inativa') DEFAULT 'Ativa',
  professor_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
);

-- =============================================
-- TABELA: TURMA_DISCIPLINA (N:N)
-- =============================================
CREATE TABLE IF NOT EXISTS turma_disciplina (
  turma_id INT NOT NULL,
  disciplina_id INT NOT NULL,
  PRIMARY KEY (turma_id, disciplina_id),
  FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE
);

-- =============================================
-- TABELA: TURMA_ALUNO (N:N)
-- =============================================
CREATE TABLE IF NOT EXISTS turma_aluno (
  turma_id INT NOT NULL,
  aluno_id INT NOT NULL,
  PRIMARY KEY (turma_id, aluno_id),
  FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
  FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);

-- =============================================
-- TABELA: EVENTOS
-- =============================================
CREATE TABLE IF NOT EXISTS eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descricao TEXT,
  data DATE NOT NULL,
  horario TIME,
  status ENUM('Agendado', 'Em andamento', 'Finalizado', 'Cancelado') DEFAULT 'Agendado',
  professor_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
);

-- =============================================
-- TABELA: MATERIAIS
-- =============================================
CREATE TABLE IF NOT EXISTS materiais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descricao TEXT,
  arquivo_ou_link VARCHAR(500),
  data_publicacao DATE NOT NULL,
  professor_id INT,
  disciplina_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL,
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE SET NULL
);

-- =============================================
-- TABELA: AVISOS
-- =============================================
CREATE TABLE IF NOT EXISTS avisos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  conteudo TEXT NOT NULL,
  data_publicacao DATE NOT NULL,
  professor_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
);

-- =============================================
-- TABELA: AVISO_TURMA (N:N)
-- =============================================
CREATE TABLE IF NOT EXISTS aviso_turma (
  aviso_id INT NOT NULL,
  turma_id INT NOT NULL,
  PRIMARY KEY (aviso_id, turma_id),
  FOREIGN KEY (aviso_id) REFERENCES avisos(id) ON DELETE CASCADE,
  FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
);

-- =============================================
-- TABELA: NOTAS
-- =============================================
CREATE TABLE IF NOT EXISTS notas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT NOT NULL,
  turma_id INT NOT NULL,
  disciplina_id INT NOT NULL,
  valor DECIMAL(5,2) NOT NULL,
  observacao TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
  FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE
);

-- =============================================
-- TABELA: FREQUENCIA
-- =============================================
CREATE TABLE IF NOT EXISTS frequencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT NOT NULL,
  turma_id INT NOT NULL,
  data DATE NOT NULL,
  presente BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
  FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
);
