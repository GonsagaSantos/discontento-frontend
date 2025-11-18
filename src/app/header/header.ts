import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; // Removido ElementRef, QueryList, ViewChildren
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  letras: string[] = "DISCONTENTO".split('');
  readonly ANIMATION_DURATION_MS = 500; 
  
  startAnimation(event: MouseEvent) {
    const element = event.target as HTMLElement; 

    element.classList.remove('active-animation');
    void element.offsetWidth;
    
    // 1. Inicia a animação (MUDANÇA IMEDIATA para #fc6044)
    element.classList.add('active-animation');
    
    setTimeout(() => {
      element.classList.remove('active-animation');
    }, this.ANIMATION_DURATION_MS);
}
}