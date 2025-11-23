import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; // Removido ElementRef, QueryList, ViewChildren
import { Router, RouterLink } from '@angular/router';
import { CarrinhoStateService } from '../services/carrinho-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  carrinhoCount: number | null = null;

  constructor( private router: Router, private carrinhoStateService: CarrinhoStateService ) {  }

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


}