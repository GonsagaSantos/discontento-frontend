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

// Interface para o DTO do Produto dentro do Item (que agora está achatado)
export interface ItemPedidoGravado {
    idItem: number,
    quantidade: number,
    
    // Campos que vieram achatados/desnormalizados do Produto:
    idProduto: number,
    nomeProduto: string,        // Usado no HTML: {{ item.nomeProduto }}
    precoUnitarioProduto: number, // Usado no HTML: {{ item.precoUnitarioProduto }}
    // Você não precisa mais do objeto 'produto' aninhado aqui
}

// Interface principal para a resposta de pedidos (GET)
export interface PedidoGravadoInterface {
    idPedido: number,
    idCliente: number, // Corrigido para ser apenas o ID (number)
    nomeCliente: string,
    
    // Campos de Endereço/Contato
    cepEntrega: string,
    logradouroEntrega: string,
    numeroEntrega: string,
    bairroEntrega: string,
    cidadeEntrega: string,
    telefoneContato: string, // No JSON: "telefoneContato" (sem "Entrega")
    
    // Campos do Pedido
    status: string,
    dataPedido: string,
    valorTotal: number, // Corrigido para number, já que float/decimal são representados como number em TS
    hashPedido: string,
    
    // Relação: Lista de Itens (agora tipada com a interface achatada)
    itens: ItemPedidoGravado[],
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