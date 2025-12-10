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
 this.userService.getUsers().subscribe({
 next: (data: any) => {
        
        // CORREÇÃO BASEADA NO SEU LOG:
        if (data.users) {
            // O backend mandou { users: [...], metadata: ... }
            this.usuarios = data.users;
        } 
        else if (Array.isArray(data)) {
            // Caso o backend mande a lista pura
            this.usuarios = data;
        } 
        else {
            // Fallback
            this.usuarios = [];
            console.error('Formato desconhecido:', data);
        }

console.log('Lista carregada na tela:', this.usuarios);
},
error: (err) => {
 console.error('Erro ao buscar:', err);
 }
});
}
 
  /* filtered view
  filteredChamados = [...this.chamados];

  onFilterChangeUser(filter: { search?: string; status?: string }) {
    const search = (filter.search || '').toLowerCase().trim();//pega o texto do filtro e transforma em minusculo e tira espaços, SENAO TIVER NADA FICA ""
    const status = filter.status || 'all';

    this.filteredChamados = this.chamados.filter((c) => {
      const matchesSearch = !search || (
        (c.titulo && c.titulo.toLowerCase().includes(search)) ||
        (c.descricao && c.descricao.toLowerCase().includes(search)) ||
        (c.status && c.status.toLowerCase().includes(search))
      );

      // For demo data, status values are free-form; in real app adapt accordingly
      const matchesStatus = status === 'all' || (c.status && c.status.toLowerCase().includes(status));

      return matchesSearch && matchesStatus;
    });
  }

}

*/
}

