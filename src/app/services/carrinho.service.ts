import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemCarrinho } from '../interfaces/ItemCarrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinhoItens: ItemCarrinho[] = [];

  constructor() { }

  // Adicionar um item ao carrinho
  adicionarItem(item: ItemCarrinho): void {
    this.carrinhoItens.push(item);
  }

  // Remover um item do carrinho
  removerItem(index: number): void {
    this.carrinhoItens.splice(index, 1);
  }

  // Limpar todos os itens do carrinho
  limparCarrinho(): void {
    this.carrinhoItens = [];
  }

  // Obter todos os itens do carrinho
  getCarrinho(): Observable<ItemCarrinho[]> {
    return of(this.carrinhoItens);
  }
}
