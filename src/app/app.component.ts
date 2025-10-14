import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { ListaChamadosComponent } from "./lista-chamados/lista-chamados.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ListaChamadosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smarttruck';
}
