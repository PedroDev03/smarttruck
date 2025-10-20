import { Component, inject } from '@angular/core';
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { ListaChamadosComponent } from "./pages/lista-chamados/lista-chamados.component";
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


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
  showNavbar = true;
  private router = inject(Router)

  constructor() {
    this.router.events.pipe(
      // Filtre apenas os eventos de "Navegação Concluída"
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      // 6. Verifique a URL
      if (event instanceof NavigationEnd) {
        // Se a URL for '/login', esconda a navbar. Senão, mostre.
        this.showNavbar = (event.url !== '/login');
        
        // Se sua rota de login for outra, ex: '/auth/login', mude acima.
      }
    });
  }
}