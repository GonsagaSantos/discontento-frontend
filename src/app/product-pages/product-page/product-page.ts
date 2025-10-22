import { Component, OnInit } from '@angular/core';
import { ProdutoInterface } from '../../interfaces/produto.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private route: ActivatedRoute, private router: Router) {
    
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state && navigation.extras.state['produto']) {
      this.produto = navigation.extras.state['produto'] as ProdutoInterface
      console.log(this.produto)
    }
  }

  ngOnInit(): void {
    if (!this.produto) {
      
      const id = this.route.snapshot.paramMap.get('idProduto');
      console.log(id)
      this.idProdutoUrl = id ? parseInt(id, 10) : null;
      console.log(this.idProdutoUrl)
      
      console.log(this.produto)
      console.log(`Produto não encontrado no state. Tentando buscar pelo ID da URL: ${this.idProdutoUrl}`);

      if (this.idProdutoUrl) {
        this.produto = {
            idProduto: 0,
            nome: '',
            descritivo: '',
            cover_path: '',
            destaque: 0,
            keywords: '',
            promo: 0,
            quantidade: 0,
            valor: 0,
            urlImagem: '',
            artista: '',
            anoLancamento: '',
            curador: '',
            paisOrigem: '',
            gravadora: '',
            carrossel: 0,
            underground: 0,
            emPromo: 0
          } as ProdutoInterface;
      } else {
        console.error('Nenhum ID de produto válido encontrado na URL.');
      }
    }
  }
}
