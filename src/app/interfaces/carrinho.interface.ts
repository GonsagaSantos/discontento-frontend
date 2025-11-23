import { ProdutoInterface } from "./produto.interface";

export interface ItemCarrinho extends ProdutoInterface {
  quantidadeCarrinho: number;
}