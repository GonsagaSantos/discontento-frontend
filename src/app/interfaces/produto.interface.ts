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

export interface ProdutoGravarInterface {
  cover_path: string | null;
  nome: string;
  descritivo: string;
  valor: number;
  promo: number;
  quantidade: number;
  destaque: number;
  keywords: string;
}