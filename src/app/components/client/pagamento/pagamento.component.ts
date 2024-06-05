import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagamento } from 'src/app/interfaces/Pagamento';
import { PagamentoService } from 'src/app/services/pagamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent {
  pagamentos: Pagamento[] = [];

  constructor(private pagamentoService: PagamentoService, private router: Router) { }

  ngOnInit(): void {
    this.getPagamentos();
  }

  getPagamentos(): void {
    this.pagamentoService.getPagamentos().subscribe((pagamentos: Pagamento[]) => {
      this.pagamentos = pagamentos;
    });
  }

  selecionarPagamento(metodo: string): void {
    // Obtém o pedido do último pagamento
    const ultimoPagamento = this.pagamentos[this.pagamentos.length - 1];
    
    // Serializa o pedido para JSON
    const pedidoJson = JSON.stringify(ultimoPagamento);

    // Armazena o pedido no localStorage
    localStorage.setItem('pedido', pedidoJson);

    // Navega para a página do método de pagamento selecionado
    this.router.navigate(['/pagamento/' + metodo]);
  }
}
