import { Component, ElementRef, OnInit, QueryList, ViewChildren, AfterViewInit, Renderer2 } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoInterface } from '../../interfaces/produto.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-produto',
  imports: [CommonModule, RouterLink],
  templateUrl: './produto.html',
  styleUrl: './produto.css'
})
export class Produto implements OnInit {
  produtos: ProdutoInterface[] = [];
  produtosCarrossel: ProdutoInterface[] = [];
  isLoading: boolean = true;

  constructor(private router: Router, private produtoService: ProdutoService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarProdutosCarrossel();
  }

  carregarProdutosCarrossel() {
    this.isLoading = true;

    this.produtoService.getProdutosCarrossel().subscribe({
      next: (data) => {
        this.produtosCarrossel = data;
        this.isLoading = false;
        console.log(data)
      },
      error: (erro) => {
        console.log("Erro ao carregar produtos do carrossel.")
      }
    })
  }

  carregarProdutos() {
    this.isLoading = true;

    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.isLoading = false;
        // console.log(data);
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

  redirectToProductPage(produto: ProdutoInterface) {
    console.log(produto)
    this.router.navigate(['/', produto.idProduto], {
      state: {
        objeto: produto
      }
    })
  }
}
