import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import pool from './db.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// =============================================
// ALUNOS
// =============================================

// Cadastro de aluno
app.post('/alunos/register', async (req, res) => {
  try {
    const { nome, email, ra, senha } = req.body;
    if (!nome || !email || !ra || !senha) {
      return res.status(400).json({ error: 'Preencha todos os campos' });
    }
    const [existing] = await pool.query('SELECT id FROM alunos WHERE ra = ? OR email = ?', [ra, email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'RA ou email já cadastrado' });
    }
    const hash = await bcrypt.hash(senha, 10);
    await pool.query('INSERT INTO alunos (nome, email, ra, senha) VALUES (?, ?, ?, ?)', [nome, email, ra, hash]);
    res.status(201).json({ message: 'Aluno cadastrado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar aluno' });
  }
});

// Login de aluno
app.post('/alunos/login', async (req, res) => {
  try {
    const { ra, senha } = req.body;
    const [rows] = await pool.query('SELECT * FROM alunos WHERE ra = ?', [ra]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'RA ou senha inválidos' });
    }
    const aluno = rows[0];
    const match = await bcrypt.compare(senha, aluno.senha);
    if (!match) {
      return res.status(401).json({ error: 'RA ou senha inválidos' });
    }
    delete aluno.senha;
    res.json({ user: aluno });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Listar alunos
app.get('/alunos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nome, email, ra, created_at FROM alunos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar alunos' });
  }
});

// Buscar aluno por ID
app.get('/alunos/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nome, email, ra, created_at FROM alunos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
});

// Atualizar aluno
app.put('/alunos/:id', async (req, res) => {
  try {
    const { nome, email } = req.body;
    await pool.query('UPDATE alunos SET nome = ?, email = ? WHERE id = ?', [nome, email, req.params.id]);
    res.json({ message: 'Aluno atualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
});

// Deletar aluno
app.delete('/alunos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM alunos WHERE id = ?', [req.params.id]);
    res.json({ message: 'Aluno removido' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover aluno' });
  }
});

// =============================================
// PROFESSORES
// =============================================

// Cadastro de professor
app.post('/professores/register', async (req, res) => {
  try {
    const { nome, email, cpf, senha } = req.body;
    if (!nome || !email || !cpf || !senha) {
      return res.status(400).json({ error: 'Preencha todos os campos' });
    }
    const [existing] = await pool.query('SELECT id FROM professores WHERE cpf = ? OR email = ?', [cpf, email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'CPF ou email já cadastrado' });
    }
    const hash = await bcrypt.hash(senha, 10);
    await pool.query('INSERT INTO professores (nome, email, cpf, senha) VALUES (?, ?, ?, ?)', [nome, email, cpf, hash]);
    res.status(201).json({ message: 'Professor cadastrado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar professor' });
  }
});

// Login de professor
app.post('/professores/login', async (req, res) => {
  try {
    const { cpf, senha } = req.body;
    const [rows] = await pool.query('SELECT * FROM professores WHERE cpf = ?', [cpf]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'CPF ou senha inválidos' });
    }
    const professor = rows[0];
    const match = await bcrypt.compare(senha, professor.senha);
    if (!match) {
      return res.status(401).json({ error: 'CPF ou senha inválidos' });
    }
    delete professor.senha;
    res.json({ user: professor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Listar professores
app.get('/professores', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nome, email, cpf, created_at FROM professores');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar professores' });
  }
});

// Buscar professor por ID
app.get('/professores/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nome, email, cpf, created_at FROM professores WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Professor não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar professor' });
  }
});

// Atualizar professor
app.put('/professores/:id', async (req, res) => {
  try {
    const { nome, email } = req.body;
    await pool.query('UPDATE professores SET nome = ?, email = ? WHERE id = ?', [nome, email, req.params.id]);
    res.json({ message: 'Professor atualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar professor' });
  }
});

// Deletar professor
app.delete('/professores/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM professores WHERE id = ?', [req.params.id]);
    res.json({ message: 'Professor removido' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover professor' });
  }
});

// =============================================
// DISCIPLINAS
// =============================================

app.get('/disciplinas', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT d.*, p.nome as professor_nome
      FROM disciplinas d
      LEFT JOIN professores p ON d.professor_id = p.id
      ORDER BY d.nome
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar disciplinas' });
  }
});

app.get('/disciplinas/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT d.*, p.nome as professor_nome
      FROM disciplinas d
      LEFT JOIN professores p ON d.professor_id = p.id
      WHERE d.id = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Disciplina não encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar disciplina' });
  }
});

app.post('/disciplinas', async (req, res) => {
  try {
    const { nome, descricao, carga_horaria, status, professor_id } = req.body;
    if (!nome || !carga_horaria) {
      return res.status(400).json({ error: 'Preencha os campos obrigatórios' });
    }
    await pool.query(
      'INSERT INTO disciplinas (nome, descricao, carga_horaria, status, professor_id) VALUES (?, ?, ?, ?, ?)',
      [nome, descricao || null, carga_horaria, status || 'Ativa', professor_id || null]
    );
    res.status(201).json({ message: 'Disciplina criada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar disciplina' });
  }
});

app.put('/disciplinas/:id', async (req, res) => {
  try {
    const { nome, descricao, carga_horaria, status, professor_id } = req.body;
    await pool.query(
      'UPDATE disciplinas SET nome = ?, descricao = ?, carga_horaria = ?, status = ?, professor_id = ? WHERE id = ?',
      [nome, descricao || null, carga_horaria, status, professor_id || null, req.params.id]
    );
    res.json({ message: 'Disciplina atualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar disciplina' });
  }
});

app.delete('/disciplinas/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM disciplinas WHERE id = ?', [req.params.id]);
    res.json({ message: 'Disciplina removida' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover disciplina' });
  }
});

// =============================================
// TURMAS
// =============================================

app.get('/turmas', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT t.*, p.nome as professor_nome,
        (SELECT COUNT(*) FROM turma_aluno ta WHERE ta.turma_id = t.id) as total_alunos
      FROM turmas t
      LEFT JOIN professores p ON t.professor_id = p.id
      ORDER BY t.nome
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar turmas' });
  }
});

app.get('/turmas/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT t.*, p.nome as professor_nome
      FROM turmas t
      LEFT JOIN professores p ON t.professor_id = p.id
      WHERE t.id = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Turma não encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar turma' });
  }
});

app.post('/turmas', async (req, res) => {
  try {
    const { nome, descricao, status, professor_id } = req.body;
    if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });
    await pool.query(
      'INSERT INTO turmas (nome, descricao, status, professor_id) VALUES (?, ?, ?, ?)',
      [nome, descricao || null, status || 'Ativa', professor_id || null]
    );
    res.status(201).json({ message: 'Turma criada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar turma' });
  }
});

app.put('/turmas/:id', async (req, res) => {
  try {
    const { nome, descricao, status, professor_id } = req.body;
    await pool.query(
      'UPDATE turmas SET nome = ?, descricao = ?, status = ?, professor_id = ? WHERE id = ?',
      [nome, descricao || null, status, professor_id || null, req.params.id]
    );
    res.json({ message: 'Turma atualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar turma' });
  }
});

app.delete('/turmas/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM turmas WHERE id = ?', [req.params.id]);
    res.json({ message: 'Turma removida' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover turma' });
  }
});

// Alunos de uma turma
app.get('/turmas/:id/alunos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.id, a.nome, a.email, a.ra
      FROM alunos a
      INNER JOIN turma_aluno ta ON ta.aluno_id = a.id
      WHERE ta.turma_id = ?
      ORDER BY a.nome
    `, [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar alunos da turma' });
  }
});

// Adicionar aluno à turma
app.post('/turmas/:id/alunos', async (req, res) => {
  try {
    const { aluno_id } = req.body;
    await pool.query('INSERT IGNORE INTO turma_aluno (turma_id, aluno_id) VALUES (?, ?)', [req.params.id, aluno_id]);
    res.json({ message: 'Aluno adicionado à turma' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar aluno' });
  }
});

// Remover aluno da turma
app.delete('/turmas/:id/alunos/:alunoId', async (req, res) => {
  try {
    await pool.query('DELETE FROM turma_aluno WHERE turma_id = ? AND aluno_id = ?', [req.params.id, req.params.alunoId]);
    res.json({ message: 'Aluno removido da turma' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover aluno' });
  }
});

// Avisos de uma turma
app.get('/turmas/:id/avisos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, p.nome as professor_nome
      FROM avisos a
      INNER JOIN aviso_turma at ON at.aviso_id = a.id
      LEFT JOIN professores p ON a.professor_id = p.id
      WHERE at.turma_id = ?
      ORDER BY a.data_publicacao DESC
    `, [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar avisos' });
  }
});

// Frequência de uma turma
app.get('/turmas/:id/frequencia', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT f.*, a.nome as aluno_nome, a.ra, t.nome as turma_nome
      FROM frequencias f
      INNER JOIN alunos a ON f.aluno_id = a.id
      INNER JOIN turmas t ON f.turma_id = t.id
      WHERE f.turma_id = ?
      ORDER BY f.data DESC, a.nome
    `, [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar frequência' });
  }
});

// =============================================
// EVENTOS
// =============================================

app.get('/eventos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.*, p.nome as professor_nome
      FROM eventos e
      LEFT JOIN professores p ON e.professor_id = p.id
      ORDER BY e.data DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar eventos' });
  }
});

app.get('/eventos/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.*, p.nome as professor_nome
      FROM eventos e
      LEFT JOIN professores p ON e.professor_id = p.id
      WHERE e.id = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Evento não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar evento' });
  }
});

app.post('/eventos', async (req, res) => {
  try {
    const { titulo, descricao, data, horario, status, professor_id } = req.body;
    if (!titulo || !data) return res.status(400).json({ error: 'Título e data são obrigatórios' });
    await pool.query(
      'INSERT INTO eventos (titulo, descricao, data, horario, status, professor_id) VALUES (?, ?, ?, ?, ?, ?)',
      [titulo, descricao || null, data, horario || null, status || 'Agendado', professor_id || null]
    );
    res.status(201).json({ message: 'Evento criado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar evento' });
  }
});

app.put('/eventos/:id', async (req, res) => {
  try {
    const { titulo, descricao, data, horario, status, professor_id } = req.body;
    await pool.query(
      'UPDATE eventos SET titulo = ?, descricao = ?, data = ?, horario = ?, status = ?, professor_id = ? WHERE id = ?',
      [titulo, descricao || null, data, horario || null, status, professor_id || null, req.params.id]
    );
    res.json({ message: 'Evento atualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar evento' });
  }
});

app.delete('/eventos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM eventos WHERE id = ?', [req.params.id]);
    res.json({ message: 'Evento removido' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover evento' });
  }
});

// =============================================
// MATERIAIS
// =============================================

app.get('/materiais', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT m.*, p.nome as professor_nome, d.nome as disciplina_nome
      FROM materiais m
      LEFT JOIN professores p ON m.professor_id = p.id
      LEFT JOIN disciplinas d ON m.disciplina_id = d.id
      ORDER BY m.data_publicacao DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar materiais' });
  }
});

app.get('/materiais/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT m.*, p.nome as professor_nome, d.nome as disciplina_nome
      FROM materiais m
      LEFT JOIN professores p ON m.professor_id = p.id
      LEFT JOIN disciplinas d ON m.disciplina_id = d.id
      WHERE m.id = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Material não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar material' });
  }
});

app.post('/materiais', async (req, res) => {
  try {
    const { titulo, descricao, arquivo_ou_link, data_publicacao, professor_id, disciplina_id } = req.body;
    if (!titulo || !data_publicacao) return res.status(400).json({ error: 'Título e data são obrigatórios' });
    await pool.query(
      'INSERT INTO materiais (titulo, descricao, arquivo_ou_link, data_publicacao, professor_id, disciplina_id) VALUES (?, ?, ?, ?, ?, ?)',
      [titulo, descricao || null, arquivo_ou_link || null, data_publicacao, professor_id || null, disciplina_id || null]
    );
    res.status(201).json({ message: 'Material criado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar material' });
  }
});

app.put('/materiais/:id', async (req, res) => {
  try {
    const { titulo, descricao, arquivo_ou_link, data_publicacao, professor_id, disciplina_id } = req.body;
    await pool.query(
      'UPDATE materiais SET titulo = ?, descricao = ?, arquivo_ou_link = ?, data_publicacao = ?, professor_id = ?, disciplina_id = ? WHERE id = ?',
      [titulo, descricao || null, arquivo_ou_link || null, data_publicacao, professor_id || null, disciplina_id || null, req.params.id]
    );
    res.json({ message: 'Material atualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar material' });
  }
});

app.delete('/materiais/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM materiais WHERE id = ?', [req.params.id]);
    res.json({ message: 'Material removido' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover material' });
  }
});

// =============================================
// AVISOS
// =============================================

app.get('/avisos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, p.nome as professor_nome
      FROM avisos a
      LEFT JOIN professores p ON a.professor_id = p.id
      ORDER BY a.data_publicacao DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar avisos' });
  }
});

app.get('/avisos/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, p.nome as professor_nome
      FROM avisos a
      LEFT JOIN professores p ON a.professor_id = p.id
      WHERE a.id = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Aviso não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar aviso' });
  }
});

app.post('/avisos', async (req, res) => {
  try {
    const { titulo, conteudo, data_publicacao, professor_id, turmas } = req.body;
    if (!titulo || !conteudo || !data_publicacao) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }
    const [result] = await pool.query(
      'INSERT INTO avisos (titulo, conteudo, data_publicacao, professor_id) VALUES (?, ?, ?, ?)',
      [titulo, conteudo, data_publicacao, professor_id || null]
    );
    const avisoId = result.insertId;
    if (turmas && turmas.length > 0) {
      for (const turmaId of turmas) {
        await pool.query('INSERT INTO aviso_turma (aviso_id, turma_id) VALUES (?, ?)', [avisoId, turmaId]);
      }
    }
    res.status(201).json({ message: 'Aviso criado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar aviso' });
  }
});

app.put('/avisos/:id', async (req, res) => {
  try {
    const { titulo, conteudo, data_publicacao, professor_id, turmas } = req.body;
    await pool.query(
      'UPDATE avisos SET titulo = ?, conteudo = ?, data_publicacao = ?, professor_id = ? WHERE id = ?',
      [titulo, conteudo, data_publicacao, professor_id || null, req.params.id]
    );
    // Atualizar turmas associadas
    await pool.query('DELETE FROM aviso_turma WHERE aviso_id = ?', [req.params.id]);
    if (turmas && turmas.length > 0) {
      for (const turmaId of turmas) {
        await pool.query('INSERT INTO aviso_turma (aviso_id, turma_id) VALUES (?, ?)', [req.params.id, turmaId]);
      }
    }
    res.json({ message: 'Aviso atualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar aviso' });
  }
});

app.delete('/avisos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM avisos WHERE id = ?', [req.params.id]);
    res.json({ message: 'Aviso removido' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover aviso' });
  }
});

// =============================================
// NOTAS
// =============================================

app.get('/notas', async (req, res) => {
  try {
    const { turma_id, aluno_id } = req.query;
    let query = `
      SELECT n.*, a.nome as aluno_nome, a.ra, t.nome as turma_nome, d.nome as disciplina_nome
      FROM notas n
      INNER JOIN alunos a ON n.aluno_id = a.id
      INNER JOIN turmas t ON n.turma_id = t.id
      INNER JOIN disciplinas d ON n.disciplina_id = d.id
    `;
    const params = [];
    const conditions = [];
    if (turma_id) { conditions.push('n.turma_id = ?'); params.push(turma_id); }
    if (aluno_id) { conditions.push('n.aluno_id = ?'); params.push(aluno_id); }
    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY a.nome';
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar notas' });
  }
});

app.get('/notas/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT n.*, a.nome as aluno_nome, a.ra, t.nome as turma_nome, d.nome as disciplina_nome
      FROM notas n
      INNER JOIN alunos a ON n.aluno_id = a.id
      INNER JOIN turmas t ON n.turma_id = t.id
      INNER JOIN disciplinas d ON n.disciplina_id = d.id
      WHERE n.id = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Nota não encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar nota' });
  }
});

app.post('/notas', async (req, res) => {
  try {
    const { aluno_id, turma_id, disciplina_id, valor, observacao } = req.body;
    if (!aluno_id || !turma_id || !disciplina_id || valor === undefined) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }
    await pool.query(
      'INSERT INTO notas (aluno_id, turma_id, disciplina_id, valor, observacao) VALUES (?, ?, ?, ?, ?)',
      [aluno_id, turma_id, disciplina_id, valor, observacao || null]
    );
    res.status(201).json({ message: 'Nota registrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar nota' });
  }
});

app.put('/notas/:id', async (req, res) => {
  try {
    const { aluno_id, turma_id, disciplina_id, valor, observacao } = req.body;
    await pool.query(
      'UPDATE notas SET aluno_id = ?, turma_id = ?, disciplina_id = ?, valor = ?, observacao = ? WHERE id = ?',
      [aluno_id, turma_id, disciplina_id, valor, observacao || null, req.params.id]
    );
    res.json({ message: 'Nota atualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar nota' });
  }
});

app.delete('/notas/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM notas WHERE id = ?', [req.params.id]);
    res.json({ message: 'Nota removida' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover nota' });
  }
});

// =============================================
// FREQUÊNCIA
// =============================================

app.get('/frequencias', async (req, res) => {
  try {
    const { turma_id, aluno_id } = req.query;
    let query = `
      SELECT f.*, a.nome as aluno_nome, a.ra, t.nome as turma_nome
      FROM frequencias f
      INNER JOIN alunos a ON f.aluno_id = a.id
      INNER JOIN turmas t ON f.turma_id = t.id
    `;
    const params = [];
    const conditions = [];
    if (turma_id) { conditions.push('f.turma_id = ?'); params.push(turma_id); }
    if (aluno_id) { conditions.push('f.aluno_id = ?'); params.push(aluno_id); }
    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY f.data DESC, a.nome';
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar frequências' });
  }
});

app.post('/frequencias', async (req, res) => {
  try {
    const { aluno_id, turma_id, data, presente } = req.body;
    if (!aluno_id || !turma_id || !data) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }
    // Verifica se já existe registro para o aluno na data
    const [existing] = await pool.query(
      'SELECT id FROM frequencias WHERE aluno_id = ? AND turma_id = ? AND data = ?',
      [aluno_id, turma_id, data]
    );
    if (existing.length > 0) {
      await pool.query('UPDATE frequencias SET presente = ? WHERE id = ?', [presente, existing[0].id]);
      return res.json({ message: 'Frequência atualizada' });
    }
    await pool.query(
      'INSERT INTO frequencias (aluno_id, turma_id, data, presente) VALUES (?, ?, ?, ?)',
      [aluno_id, turma_id, data, presente]
    );
    res.status(201).json({ message: 'Frequência registrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar frequência' });
  }
});

app.put('/frequencias/:id', async (req, res) => {
  try {
    const { presente } = req.body;
    await pool.query('UPDATE frequencias SET presente = ? WHERE id = ?', [presente, req.params.id]);
    res.json({ message: 'Frequência atualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar frequência' });
  }
});

app.delete('/frequencias/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM frequencias WHERE id = ?', [req.params.id]);
    res.json({ message: 'Frequência removida' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover frequência' });
  }
});

// =============================================
// DASHBOARD
// =============================================

app.get('/dashboard/professor/:id', async (req, res) => {
  try {
    const professorId = req.params.id;
    const [turmas] = await pool.query('SELECT COUNT(*) as total FROM turmas WHERE professor_id = ?', [professorId]);
    const [disciplinas] = await pool.query('SELECT COUNT(*) as total FROM disciplinas WHERE professor_id = ?', [professorId]);
    const [alunos] = await pool.query(`
      SELECT COUNT(DISTINCT ta.aluno_id) as total
      FROM turma_aluno ta
      INNER JOIN turmas t ON ta.turma_id = t.id
      WHERE t.professor_id = ?
    `, [professorId]);
    const [eventos] = await pool.query(`
      SELECT * FROM eventos
      WHERE professor_id = ? AND data >= CURDATE()
      ORDER BY data ASC LIMIT 5
    `, [professorId]);
    res.json({
      total_turmas: turmas[0].total,
      total_alunos: alunos[0].total,
      total_disciplinas: disciplinas[0].total,
      proximos_eventos: eventos
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar dashboard' });
  }
});

app.get('/dashboard/aluno/:id', async (req, res) => {
  try {
    const alunoId = req.params.id;
    const [turmas] = await pool.query(`
      SELECT COUNT(*) as total FROM turma_aluno WHERE aluno_id = ?
    `, [alunoId]);
    const [disciplinas] = await pool.query(`
      SELECT COUNT(DISTINCT n.disciplina_id) as total
      FROM notas n WHERE n.aluno_id = ?
    `, [alunoId]);
    const [eventos] = await pool.query(`
      SELECT * FROM eventos WHERE data >= CURDATE() ORDER BY data ASC LIMIT 5
    `);
    const [avisos] = await pool.query(`
      SELECT a.*, p.nome as professor_nome
      FROM avisos a
      INNER JOIN aviso_turma at ON at.aviso_id = a.id
      INNER JOIN turma_aluno ta ON ta.turma_id = at.turma_id
      LEFT JOIN professores p ON a.professor_id = p.id
      WHERE ta.aluno_id = ?
      ORDER BY a.data_publicacao DESC LIMIT 5
    `, [alunoId]);
    res.json({
      total_turmas: turmas[0].total,
      total_disciplinas: disciplinas[0].total,
      proximos_eventos: eventos,
      ultimos_avisos: avisos
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar dashboard' });
  }
});

// =============================================
// INICIAR SERVIDOR
// =============================================

// Função para formatar data/hora
function getTimestamp() {
  return new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'medium'
  });
}

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📅 Início: ${getTimestamp()}`);
});

// Tratamento de erro na inicialização
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ ERRO: A porta ${PORT} já está em uso!`);
    console.error(`   Outro processo está rodando na mesma porta.`);
    console.error(`   Para resolver:`);
    console.error(`   1. Feche o outro terminal que está rodando o servidor`);
    console.error(`   2. Ou use: npx kill-port ${PORT}`);
  } else {
    console.error(`\n❌ ERRO ao iniciar servidor:`, err.message);
  }
  process.exit(1);
});

// Mensagem quando o servidor parar
process.on('SIGINT', () => {
  console.log(`\n🛑 Servidor parou!`);
  console.log(`📅 Parou: ${getTimestamp()}`);
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(`\n🛑 Servidor parou!`);
  console.log(`📅 Parou: ${getTimestamp()}`);
  process.exit(0);
});

process.on('exit', (code) => {
  if (code !== 0) {
    console.log(`\n🛑 Servidor parou com código de erro: ${code}`);
    console.log(`📅 Parou: ${getTimestamp()}`);
  } else {
    console.log(`\n🛑 Servidor parou!`);
    console.log(`📅 Parou: ${getTimestamp()}`);
  }
});
