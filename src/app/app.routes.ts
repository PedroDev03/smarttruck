// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListaChamadosComponent } from './pages/tickets/lista-chamados/lista-chamados.component';
import { UsuariosComponent } from './pages/users/usuarios/usuarios.component';
import { CriarUsuarioComponent } from './pages/users/criar-usuario/criar-usuario.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent, pathMatch: 'full'  },
  
  {path: 'usuarios', component: UsuariosComponent},
    {path: 'novo-usuario', component: CriarUsuarioComponent},
  { path: 'chamados', component: ListaChamadosComponent },
  // {path: 'criar-tickets', component: }
];