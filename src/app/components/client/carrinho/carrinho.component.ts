import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { RouterLink } from '@angular/router';
import { Carrinho } from 'src/app/interfaces/Carrinho';
import { JoiaService } from 'src/app/services/joia.service';
import { Joia } from 'src/app/interfaces/Joia';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  carrinhoItens: Carrinho[] = [];
  joias: Joia[] = []; 

  constructor(private carrinhoService: CarrinhoService, private joiaService: JoiaService) { }

  ngOnInit(): void {
    this.getCarrinho();
  }

  getCarrinho(): void {
    this.carrinhoService.getCarrinho().subscribe((itens: Carrinho[]) => {
      this.carrinhoItens = itens;
      this.preloadJoias(); // Carrega apenas as joias necessárias após obter o carrinho
    });
  }

  preloadJoias(): void {
    // Lista de IDs de joias únicas
    const uniqueJoiaIds = [...new Set(this.carrinhoItens.flatMap(item => item.itens.map(subItem => subItem.idJoia)))];

    // Carrega apenas as joias necessárias
    uniqueJoiaIds.forEach(idJoia => {
      this.joiaService.getJoiaById(idJoia).subscribe((joia: Joia) => {
        this.joias[idJoia] = joia; // Armazenar a joia no array usando o ID como índice
      });
    });
  }
}
