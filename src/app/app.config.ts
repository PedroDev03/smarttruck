// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

// 1. Importe suas rotas
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 2. "Forneça" as rotas para a aplicação
    provideRouter(routes) 
    
    // ...outros providers como provideHttpClient() etc.
  ]
};