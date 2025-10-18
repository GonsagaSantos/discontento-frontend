import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dados, Usuario } from "../../services/usuario.service";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css'
})
export class ListaUsuarios implements OnInit {
  usuarios : Usuario[] = [];
  isLoading: boolean = true;

  constructor(private dadosService: Dados) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes() {
    this.isLoading = true;

    this.dadosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Carregamento de usuários concluído');
      }
    })
  }
}