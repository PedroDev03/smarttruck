import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Cliente } from '../../shared/models/cliente.model copy';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/clientes/criarCliente'; // URL base para clientes

  constructor(private http: HttpClient) {}

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUrl);
  // }
  createClient(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  // FUTURAMENTE, VOCÊ ADICIONARIA OUTROS MÉTODOS AQUI:
  // getUserById(id: number): Observable<User> { ... }
  // createUser(user: any): Observable<User> { ... }
  // updateUser(id: number, user: any): Observable<User> { ... }
}
