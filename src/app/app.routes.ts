// src/app/app.routes.ts

import { Routes } from '@angular/router';
// 1. Importe o seu componente de login
import { LoginComponent } from './login/login.component'; 

export const routes: Routes = [
  // 2. Adicione a nova regra (a rota)
  { 
    path: 'login', // Quando a URL for '/login'
    component: LoginComponent // Mostre este componente
  }

  // ...aqui você pode adicionar outras rotas
  // Ex: { path: 'home', component: HomeComponent }
];