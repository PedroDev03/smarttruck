import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Adicionei RouterModule para o routerLink funcionar

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// 1. IMPORTAR O MAT DIALOG
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 

import { UserService } from '../../../users/service/users.service';
import { User } from '../../../shared/models/user.model';
// 2. IMPORTAR O NOVO COMPONENTE CRIADO
import { EditarUsuarioDialogComponent } from './editar-usuario-dialog.component'; 

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule, // Não esqueça de importar o módulo do dialog
    RouterModule     // Importante para o routerLink funcionar
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: User[] = [];

  private userService = inject(UserService);
  private router = inject(Router);
  // 3. INJETAR O DIALOG
  private dialog = inject(MatDialog); 

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        if (data.users) {
          this.usuarios = data.users;
        } else if (Array.isArray(data)) {
          this.usuarios = data;
        } else {
          this.usuarios = [];
        }
      },
      error: (err) => console.error('Erro ao buscar:', err)
    });
  }

  // 4. NOVA FUNÇÃO: ABRE A JANELA DE EDIÇÃO
  abrirDialogoEdicao(usuario: User): void {
    const dialogRef = this.dialog.open(EditarUsuarioDialogComponent, {
      width: '400px', // Largura da janela
      data: usuario   // Envia o usuário clicado para dentro da janela
    });

    // 5. QUANDO A JANELA FECHAR (SALVAR)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dados editados:', result);
        
        // AQUI VOCÊ CHAMA O SERVIÇO DE UPDATE (QUANDO TIVER NO BACKEND)
        // Exemplo:
        /*
        this.userService.updateUser(result.id, result).subscribe({
           next: () => {
             alert('Usuário atualizado!');
             this.carregarUsuarios(); // Recarrega a lista
           },
           error: (e) => alert('Erro ao atualizar')
        });
        */
       
        // POR ENQUANTO (SÓ FRONT): ATUALIZA A LISTA VISUALMENTE
        const index = this.usuarios.findIndex(u => u.id === result.id);
        if (index !== -1) {
            this.usuarios[index] = result;
        }
      }
    });
  }
}