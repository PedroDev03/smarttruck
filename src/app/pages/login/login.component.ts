import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // 1. Importe o Router para navegar
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService, UserResponse } from '../../auth/services/auth.service';

// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  // 1. Importe todos os módulos que vamos usar no template
  imports: [
    CommonModule,
    ReactiveFormsModule, // Essencial para formulários reativos
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  // 3. Injete o FormBuilder, seu AuthService e o Router
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // 4. Modifique o método onSubmit para chamar o serviço
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      // 3. ADICIONE O TIPO UserResponse AQUI
      next: (response: UserResponse) => {
        console.log('Login bem-sucedido!', response);
        alert(`Login realizado com sucesso! Bem-vindo, ${response.email}`);
        this.router.navigate(['/chamados']);
      },
      // 4. ADICIONE O TIPO HttpErrorResponse AQUI
      error: (err: HttpErrorResponse) => {
        console.error('Erro no login:', err);
        // Podemos até verificar o status do erro
        if (err.status === 401) {
          alert('Email ou senha incorretos. Tente novamente.');
        } else {
          alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}