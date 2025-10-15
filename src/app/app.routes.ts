// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// 1. Importe o componente da lista de chamados
import { ListaChamadosComponent } from './lista-chamados/lista-chamados.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  // 2. Adicione a nova rota aqui
  { path: 'chamados', component: ListaChamadosComponent }
];