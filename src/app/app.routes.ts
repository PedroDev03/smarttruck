// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { CriarClienteComponent } from './pages/cliente/criar-cliente/criar-cliente.component';
import { LoginComponent } from './pages/login/login.component';
import { ListaChamadosComponent } from './pages/tickets/lista-chamados/lista-chamados.component';
import { CriarUsuarioComponent } from './pages/users/criar-usuario/criar-usuario.component';
import { UsuariosComponent } from './pages/users/usuarios/usuarios.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },

  { path: 'usuarios', component: UsuariosComponent },
  { path: 'novo-usuario', component: CriarUsuarioComponent },
  { path: 'chamados', component: ListaChamadosComponent },
  { path: 'novo-cliente', component: CriarClienteComponent },
  // {path: 'criar-tickets', component: }
];
