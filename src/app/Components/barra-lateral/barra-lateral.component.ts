// src/app/Components/barra-lateral/barra-lateral.component.ts

// 1. Importe Output e EventEmitter
import { Component, Output, EventEmitter } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // <-- Importe o módulo do botão

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    MatButtonModule // <-- Adicione aqui
  ],
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.scss']
})
export class SidebarComponent {
  

}