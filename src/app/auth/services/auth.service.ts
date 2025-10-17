import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para os dados que o backend retorna com sucesso
export interface UserResponse {
  id: number;
  email: string;
}

// Interface para as credenciais que enviamos para o backend
export interface LoginCredentials {
  email: string;
  password: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor() { }

  /**
   * ✅ GARANTA QUE ESTE MÉTODO EXISTA E ESTEJA SALVO!
   * Envia as credenciais para o endpoint de login da API.
   */
  login(credentials: LoginCredentials): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/login`, credentials);
  }
}