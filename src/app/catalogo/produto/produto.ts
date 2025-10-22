import { Component, ElementRef, OnInit, QueryList, ViewChildren, AfterViewInit, Renderer2 } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoInterface } from '../../interfaces/produto.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-produto',
  imports: [CommonModule, RouterLink],
  templateUrl: './produto.html',
  styleUrl: './produto.css'
})
export class Produto implements OnInit {
  produtos: ProdutoInterface[] = [];
  isLoading: boolean = true;

  constructor(private router: Router, private produtoService: ProdutoService, private renderer: Renderer2) {}
  // constructor(private produtoService: ProdutoService) {}

  @ViewChildren('dragTarget', {read: ElementRef}) dragTargets!: QueryList<ElementRef<HTMLElement>>;

  ngOnInit(): void {
    this.carregarProdutos();
  }

  ngAfterViewInit(): void {
    this.dragTargets.changes.subscribe(() => this.setupDraggables());
  }

  private setupDraggables() {
    this.dragTargets.forEach(elRef => this.makeDraggable(elRef.nativeElement));
  }

  private makeDraggable(el: HTMLElement) {
    this.renderer.setStyle(el, 'position', 'absolute');
    this.renderer.setStyle(el, 'touch-action', 'none');

    const onPointerDown = (ev: PointerEvent) => {
      ev.preventDefault();
      (ev.target as Element).setPointerCapture(ev.pointerId);
    
      let startX = ev.clientX;
      let startY = ev.clientY;
      const origLeft = el.offsetLeft;
      const origTop = el.offsetTop;

      let moveUnlisten: () => void;
      let upUnlisten: () => void;

      const onPointerMove = (e: PointerEvent) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        this.renderer.setStyle(el, 'left', `${origLeft + dx}px`);
        this.renderer.setStyle(el, 'top', `${origTop + dy}px`);
      };

      const onPointerUp = (e: PointerEvent) => {
        try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
        if (moveUnlisten) moveUnlisten();
        if (upUnlisten) upUnlisten();
      };

      moveUnlisten = this.renderer.listen('document', 'pointermove', onPointerMove);
      upUnlisten = this.renderer.listen('document', 'pointerup', onPointerUp);
    };

    // anexar listener inicial
    this.renderer.listen(el, 'pointerdown', onPointerDown);


  }

  carregarProdutos() {
    this.isLoading = true;

    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Carregamento de produtos concluído');
      }
    })
  }

  redirectToProductPage(produto: ProdutoInterface) {
    console.log(produto)
    this.router.navigate(['/', produto.idProduto], {
      state: {
        objeto: produto
      }
    })
  }
}
