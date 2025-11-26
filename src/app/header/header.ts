import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoStateService } from '../services/carrinho-state.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  carrinhoCount: number | null = null;
  public searchOpen = false;
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;
  termoBusca = new FormControl('');

  constructor( private router: Router, private carrinhoStateService: CarrinhoStateService, private loginService: LoginService ) {  }

  ngOnInit(): void {
    this.carrinhoStateService.itemCount$.subscribe(count => { 
      this.carrinhoCount = count
    })
  }

  letras: string[] = "DISCONTENTO".split('');
  readonly ANIMATION_DURATION_MS = 500; 
  
    startAnimation(event: MouseEvent) {
      const element = event.target as HTMLElement; 

      element.classList.remove('active-animation');
      void element.offsetWidth;
      
      element.classList.add('active-animation');
      
      setTimeout(() => {
        element.classList.remove('active-animation');
      }, this.ANIMATION_DURATION_MS);
    }

  redirectToShoppingPage() {
    console.log('entrei na função de comprar')
    this.router.navigate(['/carrinho'])
  }

  abrirInput() {
    this.searchOpen = !this.searchOpen;
    if (this.searchOpen) {
      setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
    }
  }

  fazerBusca(termo: string | null): void {
      const query = (termo || '').toString().trim();
      if (!query) {
        this.router.navigate(['/catalogo']);
        this.searchOpen = false;
        return;
      }
      this.router.navigate(['/catalogo'], { queryParams: { q: query } });
      this.searchOpen = false;
      this.termoBusca.reset();
    }

  limparResultadosOuRealizarBuscaGeral(): void {
      console.log("Termo curto detectado. Limpando ou recarregando o catálogo completo.");
      this.router.navigate(['/catalogo']);
  }

  navegarParaPerfilOuCadastro(): void {
    const logado = this.loginService.getIsLoggedInSnapshot();

    if (logado) { 
      this.router.navigate(['/usuario/perfil'])
    } else {
      this.router.navigate(['/usuario/cadastro'])
    }
  }

}