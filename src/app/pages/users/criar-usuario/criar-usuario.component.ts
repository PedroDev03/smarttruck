import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// 1. Importa as ferramentas do Material para o formulário
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// 2. Importa o seu "Trampo Sujo"
import { UserService } from '../../../users/service/users.service';

@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  // 3. Lista tudo que o HTML usa
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.scss']
})
export class CriarUsuarioComponent {

  // 4. O "Estado" (State) do formulário
  userForm: FormGroup;
  hidePassword = true; // (Pra fazer o botão de "ver senha")

  // 5. "Injeta" (Pede) as ferramentas
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  // 6. O "useEffect(..., [])" - Roda 1 vez
  constructor() {
    // Cria o formulário e as regras (Validators)
    this.userForm = this.fb.group({
      // O formulário TEM que bater 100% com o seu 'CreateUserRequest'
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]]
    });
  }

  // 7. O "Event Handler" (o seu 'handleSubmit')
  onSubmit(): void {
    if (this.userForm.invalid) {
      alert('Formulário inválido, meu mano. Verifique os campos.');
      return;
    }

    // Chama o "Trampo Sujo" e passa o valor do formulário
    this.userService.createUser(this.userForm.value).subscribe({
      
      // SUCESSO (o seu .then() ou try{})
      next: (response) => {
        alert(`Usuário "${response.name}" criado com sucesso!`);
        // Manda o usuário para a lista (se você tiver uma)
        // this.router.navigate(['/usuarios']); 
      },

      // FALHA (o seu .catch() ou catch{})
      error: (err) => {
        console.error('deu errado:', err);
        // A API pode retornar um erro específico
        if (err.status === 400) {
          alert('Dados inválidos.');
        } else {
          alert('A API quebrou. Tente de novo.');
        }
      }
    });
  }
}
