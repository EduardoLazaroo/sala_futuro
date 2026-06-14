import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginAlunoComponent } from './components/auth/login-aluno/login-aluno.component';
import { LoginProfessorComponent } from './components/auth/login-professor/login-professor.component';
import { CadastroAlunoComponent } from './components/auth/cadastro-aluno/cadastro-aluno.component';
import { CadastroProfessorComponent } from './components/auth/cadastro-professor/cadastro-professor.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  // Landing page
  { path: '', component: LandingPageComponent },

  // Auth routes
  { path: 'login/aluno', component: LoginAlunoComponent },
  { path: 'login/professor', component: LoginProfessorComponent },
  { path: 'cadastro/aluno', component: CadastroAlunoComponent },
  { path: 'cadastro/professor', component: CadastroProfessorComponent },

  // Professor routes
  {
    path: 'professor',
    component: LayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'professor' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./components/professor/dashboard-professor/dashboard-professor.component').then(m => m.DashboardProfessorComponent) },
      { path: 'eventos', loadComponent: () => import('./components/professor/eventos/eventos.component').then(m => m.EventosComponent) },
      { path: 'eventos/novo', loadComponent: () => import('./components/professor/eventos/evento-form/evento-form.component').then(m => m.EventoFormComponent) },
      { path: 'eventos/editar/:id', loadComponent: () => import('./components/professor/eventos/evento-form/evento-form.component').then(m => m.EventoFormComponent) },
      { path: 'materiais', loadComponent: () => import('./components/professor/materiais/materiais.component').then(m => m.MateriaisComponent) },
      { path: 'materiais/novo', loadComponent: () => import('./components/professor/materiais/material-form/material-form.component').then(m => m.MaterialFormComponent) },
      { path: 'materiais/editar/:id', loadComponent: () => import('./components/professor/materiais/material-form/material-form.component').then(m => m.MaterialFormComponent) },
      { path: 'avisos', loadComponent: () => import('./components/professor/avisos/avisos.component').then(m => m.AvisosComponent) },
      { path: 'avisos/novo', loadComponent: () => import('./components/professor/avisos/aviso-form/aviso-form.component').then(m => m.AvisoFormComponent) },
      { path: 'avisos/editar/:id', loadComponent: () => import('./components/professor/avisos/aviso-form/aviso-form.component').then(m => m.AvisoFormComponent) },
      { path: 'disciplinas', loadComponent: () => import('./components/professor/disciplinas/disciplinas.component').then(m => m.DisciplinasComponent) },
      { path: 'disciplinas/novo', loadComponent: () => import('./components/professor/disciplinas/disciplina-form/disciplina-form.component').then(m => m.DisciplinaFormComponent) },
      { path: 'disciplinas/editar/:id', loadComponent: () => import('./components/professor/disciplinas/disciplina-form/disciplina-form.component').then(m => m.DisciplinaFormComponent) },
      { path: 'turmas', loadComponent: () => import('./components/professor/turmas/turmas.component').then(m => m.TurmasComponent) },
      { path: 'turmas/novo', loadComponent: () => import('./components/professor/turmas/turma-form/turma-form.component').then(m => m.TurmaFormComponent) },
      { path: 'turmas/editar/:id', loadComponent: () => import('./components/professor/turmas/turma-form/turma-form.component').then(m => m.TurmaFormComponent) },
      { path: 'turmas/:id/alunos', loadComponent: () => import('./components/professor/turmas/turma-alunos/turma-alunos.component').then(m => m.TurmaAlunosComponent) },
      { path: 'turmas/:id/notas', loadComponent: () => import('./components/professor/notas/notas.component').then(m => m.NotasComponent) },
      { path: 'turmas/:id/frequencia', loadComponent: () => import('./components/professor/frequencia/frequencia.component').then(m => m.FrequenciaComponent) },
    ]
  },

  // Aluno routes
  {
    path: 'aluno',
    component: LayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'aluno' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./components/aluno/dashboard-aluno/dashboard-aluno.component').then(m => m.DashboardAlunoComponent) },
      { path: 'eventos', loadComponent: () => import('./components/aluno/eventos-aluno/eventos-aluno.component').then(m => m.EventosAlunoComponent) },
      { path: 'materiais', loadComponent: () => import('./components/aluno/materiais-aluno/materiais-aluno.component').then(m => m.MateriaisAlunoComponent) },
      { path: 'avisos', loadComponent: () => import('./components/aluno/avisos-aluno/avisos-aluno.component').then(m => m.AvisosAlunoComponent) },
      { path: 'disciplinas', loadComponent: () => import('./components/aluno/disciplinas-aluno/disciplinas-aluno.component').then(m => m.DisciplinasAlunoComponent) },
      { path: 'turmas', loadComponent: () => import('./components/aluno/turmas-aluno/turmas-aluno.component').then(m => m.TurmasAlunoComponent) },
      { path: 'notas', loadComponent: () => import('./components/aluno/notas-aluno/notas-aluno.component').then(m => m.NotasAlunoComponent) },
      { path: 'frequencia', loadComponent: () => import('./components/aluno/frequencia-aluno/frequencia-aluno.component').then(m => m.FrequenciaAlunoComponent) },
    ]
  },

  // Fallback
  { path: '**', redirectTo: '' }
];
