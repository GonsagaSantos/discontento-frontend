import { Component, OnInit } from '@angular/core';
import { ProdutoInterface } from '../../interfaces/produto.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})
export class ProductPage implements OnInit {
  produto: ProdutoInterface | null = null;
  idProdutoUrl: number | null = null;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private produtoService: ProdutoService
  ) {
  }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
        const id = params.get('id'); 
        this.idProdutoUrl = id ? parseInt(id, 10) : null;

        if (this.idProdutoUrl) {
            const navigation = this.router.getCurrentNavigation();
            let produtoFromState: ProdutoInterface | null = null;
            
            if (navigation?.extras.state && navigation.extras.state['objeto']) {
                produtoFromState = navigation.extras.state['objeto'] as ProdutoInterface;
            }

            if (produtoFromState && produtoFromState.idProduto === this.idProdutoUrl) {
                this.produto = produtoFromState;
                console.log('Produto carregado via State:', this.produto);
            } else {
                this.produtoService.getProdutoById(this.idProdutoUrl).subscribe({
                    next: (data) => {
                        this.produto = data;
                        console.log('Produto carregado via Serviço:', this.produto);
                    },
                    error: (err) => {
                        console.error("Erro ao carregar o produto", err);
                        this.router.navigate(['/404']);
                    }
                });
            }
        } else {
            this.router.navigate(['']);
        }
    });

    this.carregarProdutosVitrine();
  }

  listaProdutosVitrine: ProdutoInterface[] | null = null;
  carregarProdutosVitrine() {
    this.produtoService.getProdutosVitrine().subscribe({
      next: (data) => {
        this.listaProdutosVitrine = data;
      },
      error: (error) => {
        console.error("Erro ao carregar o produto");
      },
      complete: () => {
        console.log(`Produtos carregados.`)
      }
    })
  }

  listaProdutos: ProdutoInterface[] | null = null;
  procurarPorCurador(curador?: string) {
    console.log("Entrou na procura por curador")

    this.produtoService.buscarPorCurador(curador).subscribe({
      next: (data) => {
        if (!this.listaProdutos) {
            this.listaProdutos = [];
        }
        this.listaProdutos.push(...data);
        console.log(`Os produtos do curador ${curador} são ${data}`);
      },
      error: (error) => {
        console.error("Erro ao carregar o produto");
      },
      complete: () => {
        console.log(`Produtos curados por ${curador} carregados.`)
      }
    })
  }

  redirectToProductPage(produto: ProdutoInterface) {
    this.router.navigate(['/', produto.idProduto], {
        state: {
          objeto: produto
        }
    })
  }

  redirectToShoppingPage(produto: ProdutoInterface) {
    console.log('entrei na função de comprar')

    this.router.navigate(['/carrinho'], {
        state: {
          objeto: produto
        }
    })
  }
}