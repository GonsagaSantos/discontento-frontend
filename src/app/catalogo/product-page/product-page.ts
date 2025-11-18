import { Component, OnInit } from '@angular/core';
import { ProdutoInterface } from '../../interfaces/produto.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private produtoService: ProdutoService) {
    
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state && navigation.extras.state['objeto']) {
      this.produto = navigation.extras.state['objeto'] as ProdutoInterface
    }
  }

  ngOnInit(): void {
    console.log('produto da página de detalhe: '+this.produto) 

    if (!this.produto) {
      const id = this.route.snapshot.paramMap.get('idProduto');
      this.idProdutoUrl = id ? parseInt(id, 10) : null;

      if (this.idProdutoUrl) {
        this.produtoService.getProdutoById(this.idProdutoUrl).subscribe({
          next: (data) => {
            this.produto = data;
          },
          error: (err) => {
            this.router.navigate(['/404']);
          }
        });
      } else {
        this.router.navigate(['']);
      }
    } else {
      console.log('produto encontrado')
    }
  }

  listaProdutos: ProdutoInterface[] | null = null;
  procurarPorCurador(curador?: string) {
    console.log("Entrou na procura por curador")

    this.produtoService.buscarPorCurador(curador).subscribe({
      next: (data) => {
        this.listaProdutos?.push(data);
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
}
