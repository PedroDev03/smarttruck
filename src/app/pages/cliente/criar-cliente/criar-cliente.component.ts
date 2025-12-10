import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

// 1. Importa as ferramentas do Material para o formulário
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

// 2. Importa o seu "Trampo Sujo"
import { ClienteService } from '../../../users/service/cliente.service';

@Component({
  selector: 'app-criar-cliente',
  standalone: true,
  // 3. Lista tudo que o HTML usa
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './criar-cliente.component.html',
  styleUrls: ['./criar-cliente.component.scss'],
})
export class CriarClienteComponent {
  // 4. O "Estado" (State) do formulário
  clientForm: FormGroup;
  hidePassword = true; // (Pra fazer o botão de "ver senha")

  // 5. "Injeta" (Pede) as ferramentas
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  // 6. O "useEffect(..., [])" - Roda 1 vez
  constructor() {
    // Cria o formulário e as regras (Validators)
    this.clientForm = this.fb.group({
      // O formulário TEM que bater 100% com o seu 'CreateUserRequest'
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  // 7. O "Event Handler" (o seu 'handleSubmit')
  onSubmit(): void {
    if (this.clientForm.invalid) {
      alert('Formulário inválido, meu mano. Verifique os campos.');
      return;
    }

    // Chama o "Trampo Sujo" e passa o valor do formulário
    this.clienteService.createClient(this.clientForm.value).subscribe({
      // SUCESSO (o seu .then() ou try{})
      next: (response) => {
        alert(`Usuário "${response.nome}" criado com sucesso!`);
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
      },
    });
  }
}
