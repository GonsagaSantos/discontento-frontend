import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { PedidoGravadoInterface } from '../../interfaces/pedido.interface';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { UsuarioLogado } from '../../interfaces/usuario.interface';

@Component({
 selector: 'app-perfil',
  standalone: true, 
 imports: [CommonModule], 
 templateUrl: './perfil.html',
 styleUrl: './perfil.css'
})
export class Perfil implements OnInit {

  isLoading: boolean = false;
  listaPedidos: PedidoGravadoInterface[] = [];
  currentUser: UsuarioLogado | null = null; 

 constructor (
    private pedidoService: PedidoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.currentUser$.subscribe(user => {
      this.currentUser = user;
      
      if (this.currentUser && this.currentUser.id) {
        this.carregarPedidos(this.currentUser.id);
      } else {
        console.warn('Usuário não logado. Redirecionando para login/home...');
      }
    });
  }

 carregarPedidos(idCliente: number) {
  this.isLoading = true;

  this.pedidoService.getPedidosById(idCliente).subscribe({
   next: (data) => {
    this.listaPedidos = data;
    this.isLoading = false;
    console.log(data);
   },
   error: (error) => {
    console.error('Erro ao carregar pedidos:', error);
    this.isLoading = false;
   },
   complete: () => {
    console.log('Carregamento de pedidos concluído');
   }
  })
 }
}