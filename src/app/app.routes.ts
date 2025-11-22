import { Routes } from '@angular/router';
import { Sobre } from './sobre/sobre';
import { ListaUsuarios } from './home/lista-usuarios/lista-usuarios';
import { CadastroUsuario } from './home/cadastro-usuario/cadastro-usuario';
import { Produto } from './catalogo/produto-home/produto';
import { CadastroDisco } from './catalogo/cadastrar-disco/cadastro-disco';
import { ProductPage } from './catalogo/product-page/product-page';
import { Catalogo } from './lista/catalogo/catalogo';
import { Carrinho } from './lista/carrinho/carrinho';

export const routes: Routes = [
    { path: '', component: Produto }, 
    { path: 'usuario/cadastro', component: CadastroUsuario },
    { path: 'sobre', component: Sobre },
    { path: 'usuario', component: ListaUsuarios },
    { path: 'cadastro', component: CadastroDisco },
    { path: 'catalogo', component: Catalogo },
    { path: 'carrinho', component: Carrinho},
    { path: ':id', component: ProductPage, runGuardsAndResolvers: 'paramsOrQueryParamsChange' }
];
