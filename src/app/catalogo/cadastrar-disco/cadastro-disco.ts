import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoGravarInterface } from '../../interfaces/produto.interface';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cadastro-disco',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './cadastro-disco.html',
  styleUrl: './cadastro-disco.css'
})
export class CadastroDisco {

  constructor(private service: ProdutoService) {}

  novoProduto: ProdutoGravarInterface = {
    cover_path: '', 
    nome: '',
    descritivo: '',
    valor: 0,
    promo: 0,
    quantidade: 0,
    destaque: 0,
    keywords: '',
  }

  onSubmit():void {
    
    
    if (
      this.novoProduto.cover_path == '' ||
      this.novoProduto.nome == '' ||
      this.novoProduto.valor == 0 ||
      this.novoProduto.quantidade == 0
    ) {
      return;
    }

    var destaque = 0;
    if(this.novoProduto.destaque) {
      destaque = 1;
    } else {
      destaque = 0;
    }

    const dadosParaAPI: ProdutoGravarInterface = {
      cover_path: this.novoProduto.cover_path,
      nome: this.novoProduto.nome,
      descritivo: this.novoProduto.descritivo,
      valor: this.novoProduto.valor,
      promo: this.novoProduto.promo,
      quantidade: this.novoProduto.quantidade,
      destaque: destaque,
      keywords: this.novoProduto.keywords
    } 

    this.service.postProduto(dadosParaAPI).subscribe({
      next: (response) => {        
        this.novoProduto = { cover_path: '', nome: '', descritivo: '', valor: 0, promo: 0, quantidade: 0, destaque: 0, keywords: ''};
        // window.location.href = "/";
      },
      error: (error) => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Falha no cadastro. Tente novamente.');
      }
    })

  }


  validarCampos(campos: Array<any>) {

    campos.forEach(campo => {
      if(campo == '' || campo == null) {
        return false;
      }
      return true;
    });
  }

}
