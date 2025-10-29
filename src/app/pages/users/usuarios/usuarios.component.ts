import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// 1. Importa os módulos do Material para a lista e o HTML
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// 2. Importa o "Trampo Sujo" (UserService)
// **** ATENÇÃO, BOCOZÃO: Verifique se este caminho está certo! ****
// Você tinha "users/service/users.service" antes.
import { UserService } from '../../../users/service/users.service';
import { User } from '../../../shared/models/user.model'; // (Assumindo que você tem isso)

@Component({
  selector: 'app-usuarios', // <-- Seletor
  standalone: true,
  // 3. Imports que o HTML (usuarios.component.html) usa
  imports: [
    CommonModule,     // Para *ngIf e *ngFor
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './usuarios.component.html', // <-- TEMPLATE (já existe)
  styleUrls: ['./usuarios.component.scss']  // <-- ESTILO (já existe)
})
export class UsuariosComponent implements OnInit { // <-- CLASSE

  // 4. O "Estado" (State) para guardar a lista de usuários
  usuarios: User[] = [];

  // 5. "Injeta" (Pede) as ferramentas
  private userService = inject(UserService);
  private router = inject(Router);

  // 6. O "useEffect(..., [])" - Roda 1 vez para buscar os dados
  ngOnInit(): void {
    this.carregarUsuarios();
  }

  // 7. O "Handler" para buscar os usuários
  carregarUsuarios(): void {
    // Chama o service
    this.userService.getUsers().subscribe({
      next: (data) => {
        // "Seta" o estado com os dados da API
        this.usuarios = data;
      },
      error: (err) => {
        console.error('deu ruim p BUSCAR USUÁRIOS:', err);
        alert('A da API de listar usuários quebrou.');
      }
    });
  }

  // 8. Função para navegar para a página de "novo-usuario"
  //    (Chamada pelo botão no seu usuarios.component.html)
  irParaNovoUsuario(): void {
    this.router.navigate(['/novo-usuario']); // <-- Rota do seu app.routes.ts
  }
}

