# 📚 Sala Futuro — Plataforma Acadêmica Simplificada

Plataforma acadêmica web desenvolvida em **Angular 22** (frontend) e **Node.js + Express + MySQL** (backend), com dois perfis de acesso: **Aluno** e **Professor**.

## 🗂️ Estrutura do Projeto

```
sala_futuro/
├── backend/            → API REST (Node.js + Express + MySQL)
│   ├── database.sql    → Script de criação do banco de dados
│   ├── db.js           → Pool de conexão MySQL
│   ├── server.js       → Rotas e lógica da API
│   └── package.json
└── front_class/        → Aplicação Angular 22
    └── src/app/
        ├── components/ → Componentes (auth, aluno, professor, shared)
        ├── services/   → Serviços de consumo da API
        ├── models/     → Interfaces TypeScript
        └── guards/     → Guards de autenticação e perfil
```

## ⚙️ Pré-requisitos

- **Node.js** 18+ (recomendado LTS)
- **MySQL** 8+ rodando localmente
- **Angular CLI** (`npm install -g @angular/cli`)

## 🚀 Como Executar

### 1. Banco de Dados

Crie o banco executando o script SQL:

```bash
mysql -u root -p < backend/database.sql
```

> Ajuste as credenciais de acesso ao MySQL no arquivo [`backend/db.js`](backend/db.js:1) (`host`, `user`, `password`, `database`) conforme seu ambiente.

### 2. Backend (API)

```bash
cd backend
npm install
npm start
```

A API ficará disponível em **http://localhost:3000**.

### 3. Frontend (Angular)

```bash
cd front_class
npm install
npm start
```

A aplicação ficará disponível em **http://localhost:4200**.

## 🔐 Regras de Acesso

| Perfil    | Login via | Campos              |
|-----------|-----------|---------------------|
| Aluno     | RA        | RA + Senha          |
| Professor | CPF       | CPF + Senha         |

Após autenticar, cada perfil é direcionado para sua área independente:
- **Aluno** → `/aluno/dashboard`
- **Professor** → `/professor/dashboard`

## 🧭 Navegação

A navegação ocorre através de **rotas completas** com menu lateral, carregando uma nova página a cada acesso (lazy loading dos componentes).

## 🛠️ Funcionalidades

### Professor
- Dashboard (turmas, alunos, disciplinas, próximos eventos)
- CRUD de Eventos, Materiais, Avisos, Disciplinas e Turmas
- Gestão de alunos por turma (adicionar/remover/filtrar)
- Lançamento de Notas (CRUD)
- Controle de Frequência (presença/ausência)

### Aluno
- Dashboard (turmas, eventos, avisos, disciplinas)
- Visualização de Eventos, Materiais, Avisos e Disciplinas
- Minhas Turmas, Minhas Notas e Frequência (somente leitura)

## 🧱 Entidades Principais

`Aluno`, `Professor`, `Turma`, `Disciplina`, `Evento`, `Material`, `Aviso`, `Nota`, `Frequencia`

## 📡 Endpoints da API

| Recurso       | Rotas                                                            |
|---------------|------------------------------------------------------------------|
| Alunos        | `POST /alunos/register`, `POST /alunos/login`, `GET/PUT/DELETE /alunos/:id` |
| Professores   | `POST /professores/register`, `POST /professores/login`, `GET/PUT/DELETE /professores/:id` |
| Disciplinas   | `GET/POST/PUT/DELETE /disciplinas`                               |
| Turmas        | `GET/POST/PUT/DELETE /turmas` + `/turmas/:id/alunos`, `/avisos`, `/frequencia` |
| Eventos       | `GET/POST/PUT/DELETE /eventos`                                   |
| Materiais     | `GET/POST/PUT/DELETE /materiais`                                 |
| Avisos        | `GET/POST/PUT/DELETE /avisos`                                    |
| Notas         | `GET/POST/PUT/DELETE /notas`                                     |
| Frequências   | `GET/POST/PUT/DELETE /frequencias`                              |
| Dashboard     | `GET /dashboard/professor/:id`, `GET /dashboard/aluno/:id`       |

## 🎯 Objetivo Pedagógico

Projeto de aprendizado focado em: estruturação de projetos Angular, componentização, rotas, formulários, CRUD completo, relacionamento entre entidades, consumo de APIs REST, guards de autenticação e boas práticas de organização de código.
