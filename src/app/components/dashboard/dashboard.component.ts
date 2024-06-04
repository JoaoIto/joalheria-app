import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrenteService } from 'src/app/services/corrente.service';
import { PulseiraService } from 'src/app/services/pulseira.service';
import { AnelService } from 'src/app/services/anel.service';
import { Anel } from 'src/app/interfaces/Anel';
import { Pulseira } from 'src/app/interfaces/Pulseira';
import { Corrente } from 'src/app/interfaces/Corrente';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

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
    private aneisService: AnelService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
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
