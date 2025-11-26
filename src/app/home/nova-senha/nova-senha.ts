import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { Dados } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necessário para if/else no HTML

// --- FUNÇÃO DE VALIDAÇÃO PERSONALIZADA (DEVE ESTAR ANTES DO COMPONENTE) ---
// Verifica se os valores dos campos 'novaSenha' e 'confirmarSenha' coincidem
export const senhasCoincidentesValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
  const senha = control.get('novaSenha');
  const confirmarSenha = control.get('confirmarSenha');
  
  // Retorna null (válido) se a senha e a confirmação baterem.
  // Se forem diferentes, retorna o erro 'senhasDiferentes'.
  return senha && confirmarSenha && senha.value !== confirmarSenha.value ? { 'senhasDiferentes': true } : null;
};

@Component({
 selector: 'app-nova-senha',
  standalone: true,
 imports: [CommonModule, ReactiveFormsModule],
 templateUrl: './nova-senha.html',
 styleUrl: './nova-senha.css'
})
export class NovaSenha implements OnInit {

  private resetToken: string | null = null; 
  public feedbackMessage: string | null = null;
  public isError: boolean = false;
 
 formNovaSenha: FormGroup; 
 
 constructor(
  private route: ActivatedRoute, 
  private router: Router,
  private usuarioService: Dados
 ) {
  this.formNovaSenha = new FormGroup({
   novaSenha: new FormControl('', [Validators.required, Validators.minLength(6)]),
   confirmarSenha: new FormControl('', [Validators.required])
  }, { validators: senhasCoincidentesValidator });
 }

 ngOnInit(): void {
  this.resetToken = this.route.snapshot.paramMap.get('hash');
  
  if (!this.resetToken) {
      this.feedbackMessage = 'Token de redefinição não encontrado. Solicite uma nova redefinição.';
      this.isError = true;
   this.router.navigate(['/usuario/recuperar']); 
  }
 }

 onSubmit(): void {
    this.feedbackMessage = null;
    this.isError = false;

    console.log('Formulário válido?', this.formNovaSenha.valid);
    console.log('Erros do formulário:', this.formNovaSenha.errors);

    if (this.formNovaSenha.invalid) {
        this.feedbackMessage = 'Por favor, preencha todos os campos corretamente.';
        this.isError = true;
        return;
    }

    const novaSenha = this.formNovaSenha.get('novaSenha')?.value;

    if (!this.resetToken) {
        this.feedbackMessage = 'Token não encontrado. Por favor, solicite um novo link de redefinição.';
        this.isError = true;
        return;
    }

    this.usuarioService.enviarNovaSenha(this.resetToken, novaSenha).subscribe({
        next: (response) => {
            this.feedbackMessage = response.message || 'Senha alterada com sucesso!';
            this.isError = false;

            setTimeout(() => this.router.navigate(['/usuario/login']), 2000);
        },
        error: (err) => {
            console.error("Erro ao redefinir senha:", err);
            this.feedbackMessage = 'Erro na redefinição. O token pode ser inválido ou ter expirado.';
            this.isError = true;
        }
    });
 }
}