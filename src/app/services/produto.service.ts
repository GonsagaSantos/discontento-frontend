import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ProdutoInterface {
  idProduto: number;
  cover_path: string | null;
  nome: string;
  descritivo: string;
  valor: number;
  promo: number;
  quantidade: number;
  destaque: number;
  keywords: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }

  public getProdutos(): Observable<ProdutoInterface[]> {
    return this.http.get<ProdutoInterface[]>(`${this.apiUrl}/api/produto`).pipe(
      map(produtos => {
        return produtos.map(produto => {
          produto.cover_path = `cover-images/${produto.nome
            .toLowerCase()
            .replace(/ /g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]/g, '')
          }.jpg`;
          return produto;
        });
      })
    );
  }
}