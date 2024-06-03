import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrenteService } from 'src/app/services/corrente.service';
import { PulseiraService } from 'src/app/services/pulseira.service';
import { AnelService } from 'src/app/services/anel.service';
import { Anel } from 'src/app/interfaces/Anel';
import { Pulseira } from 'src/app/interfaces/Pulseira';
import { Corrente } from 'src/app/interfaces/Corrente';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
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
      this.categories[0].products = products;
    });

    this.pulseirasService.getPulseiras().subscribe((products: Pulseira[]) => {
      this.categories[1].products = products;
    });

    this.aneisService.getAneis().subscribe((products: Anel[]) => {
      this.categories[2].products = products;
    });
  }

  /* onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.categories.forEach(category => {
      category.products = category.products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });
  } */
}
