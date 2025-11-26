import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dados } from '../services/usuario.service';

@Component({
  selector: 'app-confirmar-cadastro.component',
  imports: [],
  templateUrl: './confirmar-cadastro.component.html',
  styleUrl: './confirmar-cadastro.component.css'
})
export class ConfirmarCadastroComponent implements OnInit {

  statusConfirmacao: 'carregando' | 'sucesso' | 'erro' = 'carregando';
  mensagem: string = 'Verificando seu pedido...'


  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: Dados
  ) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const idCliente = params.get('id');

        if (idCliente) {
          this.verificarConfirmacao(idCliente);
        } else {
          this.statusConfirmacao = 'erro';
          this.mensagem = 'Link de confirmação inválido. Id não encontrado.'
        }
      })
  }

  verificarConfirmacao(id: string): void { 
    this.usuarioService.confirmarCadastroUsuario(id).subscribe({
      next: (response: any) => {
        this.statusConfirmacao = 'sucesso';
        this.mensagem = 'Pedido confirmado com sucesso! Você receberá atualizações por e-mail.';
        
        setTimeout(() => this.router.navigate(['/']), 5000);

      },
      error: (err: string) => {
        this.statusConfirmacao = 'erro';
        this.mensagem = 'O link de confirmação é inválido, expirou, ou o pedido já foi processado.';
        console.error('Erro na confirmação:', err);
      }
    });
  }
}