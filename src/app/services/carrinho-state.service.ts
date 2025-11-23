import { Injectable, Inject, PLATFORM_ID } from '@angular/core'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; 
import { ProdutoInterface } from '../interfaces/produto.interface';
import { Router } from '@angular/router'; 

export interface ItemCarrinho extends ProdutoInterface {
  quantidadeCarrinho: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoStateService {
  
  private readonly CHAVE_CARRINHO = 'itens_carrinho'; 
  
  // Lista Completa de Itens
  private itensSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  public itens$: Observable<ItemCarrinho[]> = this.itensSubject.asObservable();
  
  // Contagem total de itens para o Header
  private itemCountSubject = new BehaviorSubject<number>(0);
  private valorTotalCarrinho = new BehaviorSubject<number>(0);
  public itemCount$: Observable<number> = this.itemCountSubject.asObservable();
  public valorTotal$: Observable<number> = this.valorTotalCarrinho.asObservable();

  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router 
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.carregarEstadoInicial();
  }


  private carregarEstadoInicial(): void {
    if (this.isBrowser) { 
      const dados = localStorage.getItem(this.CHAVE_CARRINHO);
      if (dados) {
        try {
          const itens: ItemCarrinho[] = JSON.parse(dados);
          this.sincronizarEstado(itens); 
        } catch (e) {
          console.error("Erro ao carregar itens do carrinho:", e);
        }
      }
    }
  }

  private salvarENotificar(itens: ItemCarrinho[]): void {
    if (this.isBrowser) {
        localStorage.setItem(this.CHAVE_CARRINHO, JSON.stringify(itens));
    }
    this.sincronizarEstado(itens);
  }

  private sincronizarEstado(itens: ItemCarrinho[]): void {
    this.itensSubject.next(itens); 
    
    const totalItens = itens.reduce((acc, item) => acc + item.quantidadeCarrinho, 0);
    const valorTotal = itens.reduce((acumulador, item) => {
      return acumulador + (item.valor * item.quantidadeCarrinho)
    }, 0)

    this.valorTotalCarrinho.next(valorTotal);
    this.itemCountSubject.next(totalItens); 
  }

  adicionar(produto: ProdutoInterface): void {
    const itensAtuais = this.itensSubject.getValue();
    const itemExistente = itensAtuais.find(i => i.idProduto === produto.idProduto);
    
    let novaLista: ItemCarrinho[];

    if (itemExistente) {

      if (itemExistente.quantidadeCarrinho + 1 > produto.quantidade) {
        console.warn(`Estoque insuficiente para ${produto.nome}.`);
        return;
      } 

      novaLista = itensAtuais.map(i => 
        i.idProduto === produto.idProduto 
          ? { ...i, quantidadeCarrinho: i.quantidadeCarrinho + 1 } 
          : i
      );
    } else {
      const novoItem: ItemCarrinho = { ...produto, quantidadeCarrinho: 1 };
      novaLista = [...itensAtuais, novoItem];
    }
    
    this.salvarENotificar(novaLista);
    this.router.navigate(['/carrinho']);
  }

  removerUmaUnidade(idProduto: number): void {
    const itensAtuais = this.itensSubject.getValue();
    const item = itensAtuais.find(i => i.idProduto === idProduto);

    if (!item) return;

    let novaLista: ItemCarrinho[];

    if (item.quantidadeCarrinho > 1) {
      // Decrementa
      novaLista = itensAtuais.map(i => 
        i.idProduto === idProduto 
          ? { ...i, quantidadeCarrinho: i.quantidadeCarrinho - 1 } 
          : i
      );
    } else {
      // Remove o item completamente
      novaLista = itensAtuais.filter(i => i.idProduto !== idProduto);
    }

    this.salvarENotificar(novaLista);
  }

  limparCarrinho(): void {
    this.salvarENotificar([]);
  }
  
  getItensSnapshot(): ItemCarrinho[] {
      return this.itensSubject.getValue();
  }
}