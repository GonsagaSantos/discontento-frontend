import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-confirmar-pedido.component',
  imports: [],
  templateUrl: './confirmar-pedido.component.html',
  styleUrl: './confirmar-pedido.component.css'
})
export class ConfirmarPedidoComponent implements OnInit {

  statusConfirmacao: 'carregando' | 'sucesso' | 'erro' = 'carregando';
  mensagem: string = 'Verificando seu pedido...'


  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const hash = params.get('hash');

        if (hash) {
          this.verificarConfirmacao(hash);
        } else {
          this.statusConfirmacao = 'erro';
          this.mensagem = 'Link de confirmação inválido. Hash não encontrado.'
        }
      })
  }

  verificarConfirmacao(hash: string): void { 
    this.pedidoService.confirmarPedidoPorHash(hash).subscribe({
      next: (response: any) => {
        this.statusConfirmacao = 'sucesso';
        this.mensagem = 'Pedido confirmado com sucesso! Você receberá atualizações por e-mail.';
        
        // setTimeout(() => this.router.navigate(['/']), 20000);

      },
      error: (err: string) => {
        this.statusConfirmacao = 'erro';
        this.mensagem = 'O link de confirmação é inválido, expirou, ou o pedido já foi processado.';
        console.error('Erro na confirmação:', err);
      }
    });
  }
}