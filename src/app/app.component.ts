// src/app/app.component.ts

import { Component, inject } from '@angular/core';
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './Components/barra-lateral/barra-lateral.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    NavbarComponent, 
    SidebarComponent, 
    MatSidenavModule
  ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smarttruck';
  
  // 1. Variáveis de controle (SÓ ESTAS DUAS)
  showLayout = true;  // Controla se o layout INTEIRO aparece (para sumir no login)
  isSidebarOpen = true; // Controla se a sidebar está aberta ou fechada
  
  private router = inject(Router);

  constructor() {
    // 2. UMA ÚNICA INSCRIÇÃO para controlar o layout
    this.router.events.pipe(
      filter(
        event => event instanceof NavigationEnd
      )
    ).subscribe(
      event => {
      if (event instanceof NavigationEnd) {
        // Se a URL for '/login', esconde o layout. Senão, mostra.
        this.showLayout = (event.url !== '/login');
      }
    });
  }

  // 3. Função para ser chamada pelo evento da SIDEBAR
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}