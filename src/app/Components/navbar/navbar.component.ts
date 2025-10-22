// src/app/navbar/navbar.component.ts

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// 1. Importe os módulos que você vai usar no HTML
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // Necessário para ngIf, ngFor, etc.
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-navbar',
  standalone: true, // Garanta que 'standalone' está como true
  // 2. Adicione os módulos importados aqui no array de 'imports'
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuAberto = false;
// 2. Crie o "disparador" de evento
  @Output() menuToggle = new EventEmitter<void>();

  // 3. Crie a função que o seu botão VAI CHAMAR
  onMenuClick(): void {
    this.menuToggle.emit(); // Isso dispara o (menuToggle) no app.component.html
  }
}