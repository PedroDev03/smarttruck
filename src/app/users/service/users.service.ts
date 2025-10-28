import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model' // Importa nosso modelo


import { CreateUserRequest, CreateUserResponse } from '../../shared/models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/auth/users'; // URL base para usuários

  constructor(private http: HttpClient) { }

  /**
   * Busca todos os usuários.
   * Corresponde ao endpoint GET /api/users que criamos.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  createUser(user: User) : Observable<User>{
    return this.http.post<User>(this.apiUrl, user);
  }
  
  // FUTURAMENTE, VOCÊ ADICIONARIA OUTROS MÉTODOS AQUI:
  // getUserById(id: number): Observable<User> { ... }
  // createUser(user: any): Observable<User> { ... }
  // updateUser(id: number, user: any): Observable<User> { ... }
}