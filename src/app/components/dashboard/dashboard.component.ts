import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrenteService } from 'src/app/services/corrente.service';
import { PulseiraService } from 'src/app/services/pulseira.service';
import { AnelService } from 'src/app/services/anel.service';
import { Anel } from 'src/app/interfaces/Anel';
import { Pulseira } from 'src/app/interfaces/Pulseira';
import { Corrente } from 'src/app/interfaces/Corrente';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ItemPedido } from 'src/app/interfaces/ItemPedido';
import { ItemPedidoService } from 'src/app/services/itens-pedido.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categories: { title: string, products: (Anel | Pulseira | Corrente)[] }[] = [
    { title: 'Correntes', products: [] as Corrente[] },
    { title: 'Pulseiras', products: [] as Pulseira[] },
    { title: 'Anéis', products: [] as Anel[] }
  ];

  quantities: { [productId: number]: number } = {};

  constructor(
    private correntesService: CorrenteService,
    private pulseirasService: PulseiraService,
    private aneisService: AnelService,
    private itemPedidoService: ItemPedidoService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.correntesService.getCorrentes().subscribe((products: Corrente[]) => {
      this.categories[0].products = products;
      products.forEach(product => this.quantities[product.id] = 1);
    });

    this.pulseirasService.getPulseiras().subscribe((products: Pulseira[]) => {
      this.categories[1].products = products;
      products.forEach(product => this.quantities[product.id] = 1);
    });

    this.aneisService.getAneis().subscribe((products: Anel[]) => {
      this.categories[2].products = products;
      products.forEach(product => this.quantities[product.id] = 1);
    });
  }

  incrementQuantity(productId: number): void {
    this.quantities[productId] = (this.quantities[productId] || 1) + 1;
  }

  decrementQuantity(productId: number): void {
    if (this.quantities[productId] > 1) {
      this.quantities[productId]--;
    }
  }

  adicionarAoCarrinho(product: Anel | Corrente | Pulseira): void {
    let tipoPedido: string;

    if (this.categories[0].products.includes(product)) {
      tipoPedido = 'CORRENTE';
    } else if (this.categories[1].products.includes(product)) {
      tipoPedido = 'PULSEIRA';
    } else if (this.categories[2].products.includes(product)) {
      tipoPedido = 'ANEL';
    } else {
      console.error('Tipo de produto desconhecido:', product);
      return;
    }

    const itemPedidoDTO: ItemPedido = {
      quantidade: this.quantities[product.id] || 1,
      idPedido: product.id,
      tipoPedido: tipoPedido
    };

    this.itemPedidoService.postItemPedido(itemPedidoDTO).subscribe(() => {
      this.router.navigate(['/carrinho']);
    });
  }

  logout(): void {
    this.localStorageService.removeItem('jwt_token');
    this.localStorageService.removeItem('usuario_logado');
    this.router.navigate(['/login']);
  }
}
