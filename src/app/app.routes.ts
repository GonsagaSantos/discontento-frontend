import { Routes } from '@angular/router';
import { Sobre } from './sobre/sobre';
import { ListaUsuarios } from './home/lista-usuarios/lista-usuarios';
import { CadastroUsuario } from './home/cadastro-usuario/cadastro-usuario';
import { Produto } from './catalogo/produto/produto';
import { CadastroDisco } from './catalogo/cadastrar-disco/cadastro-disco';
import { ProductPage } from './product-pages/product-page/product-page';

export const routes: Routes = [
    { path: '', component: Produto }, 
    { path: 'usuario/cadastro', component: CadastroUsuario },
    { path: 'sobre', component: Sobre },
    { path: 'usuario', component: ListaUsuarios },
    { path: 'cadastro', component: CadastroDisco },
    { path: ':id', component: ProductPage }
];
