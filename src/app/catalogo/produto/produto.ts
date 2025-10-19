import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoInterface } from '../../interfaces/produto.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-produto',
  imports: [CommonModule, RouterLink],
  templateUrl: './produto.html',
  styleUrl: './produto.css'
})
export class Produto implements OnInit {
  produtos: ProdutoInterface[] = [];
  isLoading: boolean = true;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.isLoading = true;

    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Carregamento de produtos concluído');
      }
    })
  }

  redirectToProductPage(idProduto: number, nome: string) {
    console.log(nome +' clicado.');
  }
}
