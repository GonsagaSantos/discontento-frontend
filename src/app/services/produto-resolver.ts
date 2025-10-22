import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ProdutoInterface } from '../interfaces/produto.interface';

// export const ProdutoResolver: ResolveFn<ProdutoInterface> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   const produtoStore = inject(produtoStore);
//   const produtoId = route.paramMap.get('idProduto')!;
//   return produtoStore.get
// }
