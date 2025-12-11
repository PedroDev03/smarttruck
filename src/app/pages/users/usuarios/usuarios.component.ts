import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Adicionei RouterModule para o routerLink funcionar

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// 1. IMPORTAR O MAT DIALOG
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import {ConfirmacaoDialogComponent} from './desativar-confirmacao-dialog.component';
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

  // ... imports e configs anteriores ...

  abrirDialogoEdicao(usuario: User): void {
    const dialogRef = this.dialog.open(EditarUsuarioDialogComponent, {
      width: '400px',
      data: usuario // Passa o usuário atual para o modal
    });

    dialogRef.afterClosed().subscribe(usuarioEditado => {
      // Se o usuário clicou em "Salvar", usuarioEditado virá preenchido
      if (usuarioEditado) {
        
        // 1. Chama o Backend para salvar de verdade
        this.userService.updateUser(usuarioEditado.id, usuarioEditado).subscribe({
          next: (response) => {
            console.log('Usuário atualizado no banco:', response);
            
            // 2. Atualiza a lista na tela visualmente (sem precisar recarregar tudo)
            // Encontra o índice do usuário antigo na lista
            const index = this.usuarios.findIndex(u => u.id === usuarioEditado.id);
            if (index !== -1) {
              // Substitui o antigo pelo novo que veio do banco
              this.usuarios[index] = response; 
            }
            
            alert('Usuário atualizado com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar:', err);
            alert('Erro ao tentar atualizar o usuário.');
          }
        });
      }
    });
  }

abrirDialogoConfirmacao(usuario: User): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '350px',
      data: { mensagem: 'Quer mesmo desativar este funcionário?' }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        // Se o usuário clicou em "Sim", chamamos o backend
        this.desativarUsuario(usuario);
      }
    });
  }

desativarUsuario(usuario: User): void {
    // Adicione o .toString() aqui
    this.userService.deleteUser(usuario.id.toString()).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
        alert('Funcionário desativado com sucesso.');
      },
      error: (err) => {
        console.error('Erro ao desativar:', err);
        alert('Erro ao tentar desativar o funcionário.');
      }
    });
  }


}