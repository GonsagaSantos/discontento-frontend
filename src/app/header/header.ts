import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoStateService } from '../services/carrinho-state.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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

  constructor( private router: Router, private carrinhoStateService: CarrinhoStateService ) {  }

  ngOnInit(): void {
    this.carrinhoStateService.itemCount$.subscribe(count => { 
      this.carrinhoCount = count
    })

    // Busca acionada somente quando o usuário pressiona Enter (via template)
    // Não acionamos buscas automáticas por debounce/valueChanges.
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
        // Se o termo estiver vazio, apenas navega para o catálogo sem filtro
        this.router.navigate(['/catalogo']);
        return;
      }

      // Navega para a rota do catálogo com o termo como query param `q`.
      // Angular cuidará do encoding dos espaços; o catálogo deve ler `q` e
      // efetuar a chamada ao backend.
      this.router.navigate(['/catalogo'], { queryParams: { q: query } });
    }

  limparResultadosOuRealizarBuscaGeral(): void {
      // Quando o termo é apagado, você pode:
      // 1. Chamar o serviço para recarregar o catálogo completo, ou
      // 2. Notificar o catálogo para limpar a lista de resultados filtrados.
      console.log("Termo curto detectado. Limpando ou recarregando o catálogo completo.");
      // Navega para o catálogo sem query param para mostrar todos os produtos
      this.router.navigate(['/catalogo']);
  }

}