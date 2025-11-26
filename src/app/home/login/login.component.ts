import { Component } from '@angular/core';
import { Dados } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/usuario.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-login.component',
  standalone: true,
 imports: [FormsModule, CommonModule],
 templateUrl: './login.component.html',
 styleUrl: './login.component.css'
})
export class LoginComponent {
 
 login: any = { 
  email: '',
  senha: '', 
 };

 isLoading: boolean = false;
 errorMessage: string = '';

 constructor(
  private dadosService: Dados,
  private loginService: LoginService,
  private router: Router
 ) { }

 onSubmit(): void {
  if (!this.login.email || !this.login.senha) {
    this.errorMessage = 'Por favor, preencha todos os campos.';
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  console.log('Tentando fazer login com:', this.login.email);
   
  const dadosParaAPI: Login = {
    email: this.login.email,
    senha: this.login.senha
  };

  this.dadosService.loginUsuario(dadosParaAPI).subscribe({
   next: (response: any) => {    
    console.log('Resposta do servidor:', response);
    
    if (response && response.email && response.idCliente) { 
            const fakeToken = btoa(response.email + new Date().getTime());
            // Mapear idCliente para id para compatibilidade com UsuarioLogado
            const usuarioLogado = {
              id: response.idCliente,
              nome: response.nome || 'Usuário',
              email: response.email
            };
            this.loginService.login(fakeToken, usuarioLogado); 
            
            this.login = { email: '', senha: '' };
      this.errorMessage = '';
      alert('Login realizado com sucesso!');
      this.router.navigate(['/']);
            
    } else if (response.message) {
            this.errorMessage = response.message;
            this.isLoading = false;
        } else {
     this.errorMessage = 'Erro desconhecido ao fazer login.';
     this.isLoading = false;
    }
   },
   error: (error) => {
    console.error('Erro ao fazer login:', error);
        if (error.status === 401) {
            this.errorMessage = 'Credenciais inválidas (401).';
        } else {
            this.errorMessage = 'Falha na conexão com o servidor.';
        }
    this.isLoading = false;
   }
  });
  
 }
}