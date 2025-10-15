import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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
  hidePassword = true; // Controla a visibilidade da senha

  // 2. Injete o FormBuilder para criar o formulário
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      // 3. Defina os campos e suas validações
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // 4. Método chamado quando o formulário é enviado
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulário enviado!');
      console.log('Dados:', this.loginForm.value);
      // Aqui você colocaria a lógica para autenticar com um backend
    } else {
      console.log('Formulário inválido.');
    }
  }

  // Método para alternar a visibilidade da senha
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}