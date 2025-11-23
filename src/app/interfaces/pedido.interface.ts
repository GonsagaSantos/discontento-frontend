export interface PedidoInterface {
    cliente: Cliente,
    itens: Item[],
    cepEntrega: string,
    logradouroEntrega: string,
    numeroEntrega: string,
    bairroEntrega: string,
    cidadeEntrega: string,
    telefoneContatoEntrega: string
}

export interface Item {
    quantidade: number,
    produto: Produto,

}

export interface Produto {
    idProduto: number
}

export interface Cliente { 
    idCliente: number
}