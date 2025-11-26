import { Component, OnInit } from '@angular/core';
import { Router,  RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProdutoInterface } from '../../interfaces/produto.interface'; 
import { PedidoService } from '../../services/pedido.service';
import { LoginService } from '../../services/login.service';
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
  isLoading: boolean = false;
  errorMessage: string = '';
  // Corrigido: tornar público para uso no template
  public carrinhoService: CarrinhoStateService;

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private loginService: LoginService,
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
      this.errorMessage = "Por favor, preencha todos os campos obrigatórios e certifique-se de que o carrinho não está vazio.";
      console.error(this.errorMessage);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const usuarioId = this.loginService.getUserId();
    console.log('ID do usuário obtido:', usuarioId);
    
    if (!usuarioId) {
      this.errorMessage = "Usuário não autenticado. Por favor, faça login antes de fazer um pedido.";
      this.isLoading = false;
      console.error("Sem ID de usuário, redirecionando para login");
      this.router.navigate(['/usuario/login']);
      return;
    }

    const dadosDoForms = this.formEntrega.value;
    const itensParaBackend: Item[] = this.itensNoCarrinho.map(item => ({
        quantidade: item.quantidadeCarrinho, 
        produto: { idProduto: item.idProduto }
    }));
    
    const cliente: Cliente = { idCliente: usuarioId };
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
        this.isLoading = false;
        this.errorMessage = '';
        alert('Pedido realizado com sucesso!');
        this.router.navigate(['/sucesso']);
      },
      error: (err) => {
        console.error("Erro no envio do pedido:", err);
        this.errorMessage = "Erro ao finalizar o pedido. Verifique os dados e tente novamente.";
        this.isLoading = false;
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