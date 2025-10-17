// Espelha seus DTOs de Ticket
// Exemplo para CreateTicketRequest
export interface CreateTicketRequest {
  title: string;
  description: string;
  clientId: number; // ou o que for necessário
}

// Exemplo para a resposta de um ticket
export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
}