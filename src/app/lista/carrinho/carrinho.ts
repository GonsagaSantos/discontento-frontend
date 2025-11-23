import { Component, OnInit } from '@angular/core';
import { Router,  RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProdutoInterface } from '../../interfaces/produto.interface'; 
import { PedidoService } from '../../services/pedido.service';
import { Cliente, Item, PedidoInterface } from '../../interfaces/pedido.interface';
import { CarrinhoStateService, ItemCarrinho } from '../../services/carrinho-state.service'; // ItemCarrinho da interface
import { CommonModule } from '@angular/common'; // Adicionado para uso no HTML

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [ RouterModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './carrinho.html',
  styleUrls: ['./carrinho.css']
})
export class Carrinho implements OnInit {
  itensNoCarrinho: ItemCarrinho[] = [];
  formEntrega: FormGroup;
  valorTotal: number | null = null;
  // Corrigido: tornar público para uso no template
  public carrinhoService: CarrinhoStateService;

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    carrinhoService: CarrinhoStateService
  ) {
    this.formEntrega = this.fb.group({
      cepEntrega: [''],
      logradouroEntrega: [''],
      numeroEntrega: ['', Validators.required],
      bairroEntrega: ['', Validators.required],
      cidadeEntrega: ['', Validators.required],
      telefoneContatoEntrega: ['']
    });

    // Corrigido: atribuir ao campo público
    this.carrinhoService = carrinhoService;
  }

  ngOnInit(): void {
    this.carrinhoService.itens$.subscribe(itens => {
        this.itensNoCarrinho = itens;
        console.log('Componente Carrinho: Lista atualizada.', this.itensNoCarrinho.length);
    });
    // Não precisa mais do subscribe manual para valorTotal
  }

  enviarPedido() {
    if (this.formEntrega.invalid || this.itensNoCarrinho.length === 0) {
      console.error("Erro: Formulário inválido ou carrinho vazio.");
      return;
    }

    const dadosDoForms = this.formEntrega.value;
    const itensParaBackend: Item[] = this.itensNoCarrinho.map(item => ({
        quantidade: item.quantidadeCarrinho, 
        produto: { idProduto: item.idProduto }
    }));
    
    const cliente: Cliente = { idCliente: 1 };
    const pedidoFinal: PedidoInterface = {
        cliente: cliente,
        itens: itensParaBackend,
        cepEntrega: dadosDoForms.cepEntrega,
        logradouroEntrega: dadosDoForms.logradouroEntrega,
        numeroEntrega: dadosDoForms.numeroEntrega,
        bairroEntrega: dadosDoForms.bairroEntrega,
        cidadeEntrega: dadosDoForms.cidadeEntrega,
        telefoneContatoEntrega: dadosDoForms.telefoneContatoEntrega
    };
    
    console.log("JSON de Pedido Pronto para Envio:", pedidoFinal);

    this.pedidoService.finalizarPedido(pedidoFinal).subscribe({
      next: (data) => {
        console.log("Pedido finalizado com sucesso no backend.", data);
        this.carrinhoService.limparCarrinho(); 
        
        this.router.navigate(['/sucesso']);
      },
      error: (err) => {
        console.error("Erro no envio do pedido:", err);
      }
    });
  }

  adicionarItemDoCarrinho(item: ProdutoInterface) {
    this.carrinhoService.adicionar(item);
  }

  removerItemDoCarrinho(produto: ProdutoInterface) {
    this.carrinhoService.removerUmaUnidade(produto.idProduto);
  }
}