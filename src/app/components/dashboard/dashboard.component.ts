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

  logout(): void {
    // Limpar o token do local storage
    this.localStorageService.removeItem('jwt_token');
    this.localStorageService.removeItem('usuario_logado');
    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }

  loadProducts(): void {
    this.correntesService.getCorrentes().subscribe((products: Corrente[]) => {
      console.log('Correntes:', products);
      this.categories[0].products = products;
    });

    this.pulseirasService.getPulseiras().subscribe((products: Pulseira[]) => {
      console.log('Pulseiras:', products);
      this.categories[1].products = products;
    });

    this.aneisService.getAneis().subscribe((products: Anel[]) => {
      console.log('Anéis:', products);
      this.categories[2].products = products;
    });
  }

  adicionarAoCarrinho(product: Anel | Corrente | Pulseira): void {
    console.log(product);
    let tipoPedido: string;

    // Verifica a categoria do produto e define o tipo de pedido
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
      quantidade: 1,
      idPedido: product.id,
      tipoPedido: tipoPedido
    };

    console.log(itemPedidoDTO);

    this.itemPedidoService.postItemPedido(itemPedidoDTO).subscribe(() => {
      // Navegar para a página do carrinho após adicionar o item
      this.router.navigate(['/carrinho']);
    });
}



  // onSearch(event: Event): void {
  //   const query = (event.target as HTMLInputElement).value.toLowerCase();
  //   this.categories.forEach(category => {
  //     category.products = category.products.filter(product =>
  //       product.joiaDTO.nome.toLowerCase().includes(query) ||
  //       product.joiaDTO.descricao.toLowerCase().includes(query)
  //     );
  //   });
  // }
}
