// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListaChamadosComponent } from './pages/lista-chamados/lista-chamados.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  {path: 'usuarios', component: UsuariosComponent},
  { path: 'chamados', component: ListaChamadosComponent }
];