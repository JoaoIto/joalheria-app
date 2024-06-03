import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCarrinho } from 'src/app/interfaces/ItemCarrinho';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit{
  carrinhoItens: ItemCarrinho[] = [];

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.getCarrinho();
  }

  getCarrinho(): void {
    this.carrinhoService.getCarrinho().subscribe((itens: ItemCarrinho[]) => {
      this.carrinhoItens = itens;
    });
  }
}
