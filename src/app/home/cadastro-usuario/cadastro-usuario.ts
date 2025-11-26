import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Dados } from '../../services/usuario.service'; 
import { UsuarioGravar } from '../../interfaces/usuario.interface';

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
    cep: '',
    logradouro: '',
    numero_contato: '',
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
        cep: this.usuario.cep,
        logradouro: this.usuario.logradouro,
        numero_contato: this.usuario.numero_contato,
        ativo: 1 
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