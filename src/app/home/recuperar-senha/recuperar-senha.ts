import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecuperarSenhaInterface } from '../../interfaces/usuario.interface';
import { Dados } from '../../services/usuario.service';

@Component({
  selector: 'app-recuperar-senha',
  imports: [FormsModule],
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.css'
})
export class RecuperarSenha {

  recuperacao: RecuperarSenhaInterface = { 
    email: ''
  };

  constructor(private dadosService: Dados) { }

  onSubmit(): void {
    if (!this.recuperacao.email) {
        alert('Por favor, informe seu e-mail.');
        return;
    }

    console.log('Dados do formulário:', this.recuperacao);
      
    const dadosParaAPI: RecuperarSenhaInterface = {
        email: this.recuperacao.email
    };
    
    this.dadosService.solicitarRedefinicaoSenha(dadosParaAPI.email).subscribe({
      next: (response: any) => {        
        this.recuperacao = { email: '' };
      },
      error: (error) => {
        console.error('Erro ao recuperar senha:', error);
        alert('Falha na recuperação. Tente novamente.');
      }
    });
    

  }
}
