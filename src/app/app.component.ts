import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { ListaChamadosComponent } from "./pages/lista-chamados/lista-chamados.component";

// src/app/app.component.ts
// ...
@Component({
  selector: 'app-root',
  standalone: true,
  // Remova o ListaChamadosComponent daqui
  imports: [RouterOutlet, NavbarComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smarttruck';
}