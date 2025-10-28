import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../../Components/filter/filter.component';
// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-chamados',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FilterComponent
  ],
  templateUrl: './lista-chamados.component.html',
  styleUrls: ['./lista-chamados.component.scss']
})
export class ListaChamadosComponent {


  // Dados fictícios para simular a lista de chamados
  chamados = [
    {
      titulo: 'Manutenção Preventiva - Caminhão 04',
      status: 'Chamado aberto em 30/08',
      descricao: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.'
    },
    {
      titulo: 'Troca de motor - Caminhão 03',
      status: 'Chamado aberto em 29/08',
      descricao: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.'
    },
    {
      titulo: 'Problema de Mola - Caminhão 05',
      status: 'Chamado aberto em 28/08',
      descricao: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.'
    }
  ];

  // filtered view
  filteredChamados = [...this.chamados];

  onFilterChange(filter: { search?: string; status?: string }) {
    const search = (filter.search || '').toLowerCase().trim();//pega o texto do filtro e transforma em minusculo e tira espaços, SENAO TIVER NADA FICA ""
    const status = filter.status || 'all';

    this.filteredChamados = this.chamados.filter((c) => {
      const matchesSearch = !search || (
        (c.titulo && c.titulo.toLowerCase().includes(search)) ||
        (c.descricao && c.descricao.toLowerCase().includes(search)) ||
        (c.status && c.status.toLowerCase().includes(search))
      );

      // For demo data, status values are free-form; in real app adapt accordingly
      const matchesStatus = status === 'all' || (c.status && c.status.toLowerCase().includes(status));

      return matchesSearch && matchesStatus;
    });
  }

}