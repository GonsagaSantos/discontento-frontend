import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoInterface, ProdutoGravarInterface } from '../interfaces/produto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }

  public getProdutos(): Observable<ProdutoInterface[]> {
    return this.http.get<ProdutoInterface[]>(`${this.apiUrl}/api/produto`);
  }

  public getProdutosVitrine(): Observable<ProdutoInterface[]> {
    return this.http.get<ProdutoInterface[]>(`${this.apiUrl}/api/produto/vitrine`);
  }

  public getProdutosCarrossel(): Observable<ProdutoInterface[]> {
    return this.http.get<ProdutoInterface[]>(`${this.apiUrl}/api/produto/carrossel`);
  }

  public getProdutoById(idProduto: number): Observable<ProdutoInterface> {
    return this.http.get<ProdutoInterface>(`${this.apiUrl}/api/produto/${idProduto}`);
  }

  public postProduto(novoProduto: ProdutoGravarInterface): Observable<ProdutoGravarInterface> {
    return this.http.post<ProdutoGravarInterface>(`${this.apiUrl}/api/produto`, novoProduto)
  }
  
  //------------------------------------------------------------------ 2.1 Busca de Produtos
    
  public buscarPorGravadora(gravadora?: string): Observable<ProdutoInterface[]> {
    return this.http.get<ProdutoInterface[]>(`${this.apiUrl}/api/produto/gravadora/${gravadora}`);
  }

  public buscarPorAno(ano?: string): Observable<ProdutoInterface[]> {
    return this.http.get<ProdutoInterface[]>(`${this.apiUrl}/api/produto/ano/${ano}`);
  }

  public buscarPorPais(pais?: string): Observable<ProdutoInterface[]> {
    return this.http.get<ProdutoInterface[]>(`${this.apiUrl}/api/produto/pais/${pais}`);
  }

  public buscarPorCurador(curador?: string): Observable<ProdutoInterface[]> {
    return this.http.get<ProdutoInterface[]>(`${this.apiUrl}/api/produto/curador/${curador}`);
  }
  
  public buscarPorKeyword(keyword?: string): Observable<ProdutoInterface[]> {
    return this.http.get<ProdutoInterface[]>(`${this.apiUrl}/api/produto/buscar/${keyword}`)
  }

  public buscarPorTermo(termo: string): Observable<ProdutoInterface[]> {
    const encoded = encodeURIComponent(termo || '');
    return this.http.get<ProdutoInterface[]>(`${this.apiUrl}/api/produto/nome/${encoded}`)
  }
  
  //------------------------------------------------------------------ 5. Listas

  public buscarGeneros(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/produto/listar/generos`);
  }

  public buscarCuradores(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/produto/listar/curadores`)
  }

  public buscarGravadoras(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/produto/listar/gravadoras`)
  }

  public buscarAnos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/produto/listar/anos`)
  }
  
  public buscarPaises(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/produto/listar/paises`)
  }
}