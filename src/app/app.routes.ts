import { Routes } from '@angular/router';
import { Sobre } from './sobre/sobre';
import { ListaUsuarios } from './home/lista-usuarios/lista-usuarios';
import { CadastroUsuario } from './home/cadastro-usuario/cadastro-usuario';
import { Produto } from './catalogo/produto-home/produto';
import { CadastroDisco } from './catalogo/cadastrar-disco/cadastro-disco';
import { ProductPage } from './catalogo/product-page/product-page';
import { Catalogo } from './lista/catalogo/catalogo';
import { Carrinho } from './lista/carrinho/carrinho';
import { ConfirmarPedidoComponent } from './confirmar-pedido/confirmar-pedido.component';
import { ConfirmarCadastroComponent } from './confirmar-cadastro/confirmar-cadastro.component';
import { LoginComponent } from './home/login/login.component';
import { RecuperarSenha } from './home/recuperar-senha/recuperar-senha';
import { NovaSenha } from './home/nova-senha/nova-senha';
import { Perfil } from './home/perfil/perfil';

export const routes: Routes = [
    { path: '', component: Produto }, 
    { path: 'usuario/cadastro', component: CadastroUsuario },
    { path: 'usuario/login', component: LoginComponent },
    { path: 'usuario/perfil', component: Perfil },
    { path: 'usuario/recuperar', component: RecuperarSenha },
    { path: 'usuario/nova-senha/:hash', component: NovaSenha },
    { path: 'sobre', component: Sobre },
    { path: 'usuario', component: CadastroUsuario },
    { path: 'cadastro', component: CadastroDisco },
    { path: 'catalogo', component: Catalogo },
    { path: 'carrinho', component: Carrinho},
    { path: 'api/pedido/confirmar/:hash', component: ConfirmarPedidoComponent },
    { path: 'api/cliente/efetivar/:id', component: ConfirmarCadastroComponent },
    { path: ':id', component: ProductPage, runGuardsAndResolvers: 'paramsOrQueryParamsChange' }
];
