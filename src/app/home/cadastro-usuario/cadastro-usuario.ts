import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Dados, UsuarioGravar } from '../../services/usuario.service'; 

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './cadastro-usuario.html',
  styleUrls: ['./cadastro-usuario.css']
})
export class CadastroUsuario {
  
  usuario: any = { 
    nome: '',
    email: '',
    senha: '', 
    documento: '',
    ativo: true 
  };

  constructor(private dadosService: Dados) { }

  onSubmit(): void {
    if (!this.usuario.nome || !this.usuario.email || !this.usuario.senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    console.log('Dados do formulário:', this.usuario);
      
    const dadosParaAPI: UsuarioGravar = {
        nome: this.usuario.nome,
        email: this.usuario.email,
        documento: this.usuario.documento,
        senha: this.usuario.senha,
        ativo: this.usuario.ativo ? 1 : 0 
    };
    
    this.dadosService.salvarUsuario(dadosParaAPI).subscribe({
      next: (response) => {        
        this.usuario = { nome: '', email: '', senha: '', documento: '', ativo: true };
        window.location.href = "/";
      },
      error: (error) => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Falha no cadastro. Tente novamente.');
      }
    });
  }
}