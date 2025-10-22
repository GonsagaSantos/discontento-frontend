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
  urlImagem: string;
  artista: string;
  anoLancamento: string;
  curador: string;
  paisOrigem: string;
  gravadora: string;
  carrossel: number;
  underground: number;
  emPromo: number;
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