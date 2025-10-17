import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model' // Importa nosso modelo

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // URL base para usuários

  constructor(private http: HttpClient) { }

  /**
   * Busca todos os usuários.
   * Corresponde ao endpoint GET /api/users que criamos.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // FUTURAMENTE, VOCÊ ADICIONARIA OUTROS MÉTODOS AQUI:
  // getUserById(id: number): Observable<User> { ... }
  // createUser(user: any): Observable<User> { ... }
  // updateUser(id: number, user: any): Observable<User> { ... }
}