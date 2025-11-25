import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Router } from '@angular/router';
import { ProdutoInterface } from '../../interfaces/produto.interface';
import { CommonModule } from '@angular/common'; // Necessário para @if e @for

@Component({
  selector: 'app-catalogo',
  // Se for standalone, precisa do imports: [CommonModule]
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class Catalogo implements OnInit {

  // Propriedades de Estado
  listaGeneros: string[] = [];
  listaGravadoras: string[] = [];
  listaCuradores: string[] = [];
  listaPaises: string[] = [];
  listaAnos: string[] = [];
  listaAlbuns: ProdutoInterface[] = [];
  listaAlbunsImutavel: ProdutoInterface[] = [];

  constructor(
    private router: Router, 
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarFiltros();

    // Observa os query params para executar buscas quando houver `q`.
    this.route.queryParams.subscribe(params => {
      const termo = params['q'];
      if (termo && termo.toString().trim().length > 0) {
        // Se existe termo na query, realiza busca no backend
        this.produtoService.buscarPorTermo(termo.toString()).subscribe({
          next: (data: ProdutoInterface[]) => {
            this.listaAlbuns = data;
            this.listaAlbunsImutavel = data;
            console.log(`Resultados da busca para: ${termo}`);
          },
          error: (err) => {
            console.error('Erro ao buscar por termo:', err);
            this.listaAlbuns = [];
          }
        });
      } else {
        this.carregarAlbunsIniciais();
      }
    });
  }
  
  // --- LÓGICA DE CARREGAMENTO INICIAL ---

  carregarFiltros(): void {

    this.produtoService.buscarGeneros().subscribe({
      next: (data: string[]) => {
        this.listaGeneros = data;
        console.log(this.listaGeneros);
      }
    });

    this.produtoService.buscarGravadoras().subscribe({
      next: (data: string[]) => {
        this.listaGravadoras = data;
        console.log(this.listaGravadoras);
      }
    });

    this.produtoService.buscarPaises().subscribe({
      next: (data: string[]) => {
        this.listaPaises = data;
        console.log(this.listaPaises);
      }
    });

    this.produtoService.buscarCuradores().subscribe({
      next: (data: string[]) => {
        this.listaCuradores = data;
        console.log(this.listaCuradores);
      }
    });

    this.produtoService.buscarAnos().subscribe({
      next: (data: string[]) => {
        this.listaAnos = data;
        console.log(this.listaAnos);
      }
    });
  }

  carregarAlbunsIniciais(): void {
    this.produtoService.getProdutos().subscribe({
      next: (data: ProdutoInterface[]) => {
        this.listaAlbuns = data;
        this.listaAlbunsImutavel = data;
        console.log("Álbuns iniciais carregados.");
      }
    });
  }

  // --- LÓGICA DE FILTRO ---
  
  filtrarPorGenero(genero: string) {
    console.log(`Entrou na pesquisa por genero: ${genero}`);
    this.produtoService.buscarPorKeyword(genero).subscribe({
      next: (data: ProdutoInterface[]) => {
        console.log(`Consultou os álbuns: ${data}`)
        this.listaAlbuns = data; 
      }
    });
  }

  filtrarPorCurador(curador: string) {
    console.log(`Entrou na pesquisa por curador: ${curador}`);
    this.produtoService.buscarPorCurador(curador).subscribe({
      next: (data: ProdutoInterface[]) => {
        this.listaAlbuns = data;
      }
    });
  }

  filtrarPorAno(ano: string) {
    console.log(`Entrou na pesquisa por ano: ${ano}`);
    this.produtoService.buscarPorAno(ano).subscribe({
      next: (data: ProdutoInterface[]) => {
        this.listaAlbuns = data;
      }
    });
  }

  filtrarPorPais(pais: string) {
    console.log(`Entrou na pesquisa por pais: ${pais}`);
    this.produtoService.buscarPorPais(pais).subscribe({
      next: (data: ProdutoInterface[]) => {
        this.listaAlbuns = data;
      }
    });
  }

  filtrarPorGravadora(gravadora: string) {
    console.log(`Entrou na pesquisa por gravadora: ${gravadora}`);
    this.produtoService.buscarPorGravadora(gravadora).subscribe({
      next: (data: ProdutoInterface[]) => {
        this.listaAlbuns = data;
      }
    });
  }

  verTodosProdutos() {
    this.listaAlbuns = this.listaAlbunsImutavel;
  }

  redirectToProductPage(produto: ProdutoInterface) {
    this.router.navigate(['/', produto.idProduto], {
        state: {
          objeto: produto
        }
    })
  }
}