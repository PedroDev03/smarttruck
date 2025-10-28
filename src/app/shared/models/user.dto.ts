/**
 * O que o seu frontend ENVIA.
 * Corresponde ao seu DTO 'CreateUserRequest' (name, email, password, phone)
 */
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

/**
 * O que o seu backend RESPONDE.
 * Corresponde ao seu DTO 'CreateUserResponse'
 */
export interface CreateUserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string; // O Angular vai tratar o 'Instant' do Java como 'string'
  updatedAt: string;
  deletedAt: string | null; // Pode ser nulo
  loginAt: string | null;   // Pode ser nulo
}