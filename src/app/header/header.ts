import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; // Removido ElementRef, QueryList, ViewChildren
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  constructor( private router: Router ) {  }

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